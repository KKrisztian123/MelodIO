import * as React from "react";
import { useState, useCallback } from "react";
import './fields.scss';
import { Modal } from "../../../modal/modal";
import { format, parse } from "date-fns";
import { useFormContext } from "react-hook-form";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../../../core/hooks/toggleHook";
import InputFieldWithButton from "./inputFieldWithButton";
import TimePicker from "./pickers/timePicker";
import {hu} from 'date-fns/locale';
import PropTypes from "prop-types";

/**
 * Time inputfield for forms.
 * @param {string} id - The id the inputfield is added to the form with.
 * @param {string} label - Input field label text.
 * @param {object} config - Optional extra register configuration parameters for the input.
 * @param {string} description - Optional description for the input.
 */


const TimeField = ({id, config, ...rest}) => {
    const [isActive,toggleActive] = useToggle();
    const { register, setValue } = useFormContext();
    const [date,setDate] = useState(); //iso date

    const checkDate = useCallback((v)=>{
        const targetDate = parse(v,"H:mm",new Date());
        return targetDate != "Invalid Date" ? targetDate : false;
    },[])

    const selectDate = useCallback((date)=>{
        setDate(date); //iso
        setValue(id, format(new Date(date),'H:mm',{locale:hu}),{shouldValidate:true}); //reformatted
    },[]);

    const isEmpty = useCallback((val) => {
        return val === "" ? true : checkDate(val);
    },[])

    const {onChange, ...restOfRegister} = register(id,{...config,validate:{
        isDate:v => isEmpty(v) || "Érvénytelen idő"
    }});
    
    const onChangeWrapper = useCallback((e)=>{
        checkDate(e.target.value) && setDate(checkDate(e.target.value));
        onChange(e);
    },[])

    return(
        <>
            <InputFieldWithButton 
                {...rest}
                onChange={onChangeWrapper}
                {...restOfRegister}
                type={"text"}
                active={isActive} 
                changeActive={toggleActive} 
                icons={faClock} 
                ariaRole={"Időválasztó megnyitása"}
            >
                <Modal open={isActive} setOpen={toggleActive}>
                    <TimePicker onChange={selectDate} value={date} />
                </Modal>
            </InputFieldWithButton>
        </>

    )
}
export default TimeField;

TimeField.propTypes = {
    /** the id the inputfield is added to the form with */
    id: PropTypes.string.isRequired,

    /** Optional extra configuration parameters for the registered input */
    config: PropTypes.object,
}