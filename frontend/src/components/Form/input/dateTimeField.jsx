import * as React from "react";
import { useState, useCallback } from "react";
import './fields.scss';
import { Modal } from "../../../modal/modal";
import { format, parse } from "date-fns";
import { useFormContext } from "react-hook-form";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../../../core/hooks/toggleHook";
import InputFieldWithButton from "./inputFieldWithButton";
import {hu} from 'date-fns/locale';
import DateTimePicker from "./pickers/dateTimePicker";
import PropTypes from "prop-types";

/**
 * Datetime inputfield for forms.
 * @param {string} id - The id the inputfield is added to the form with.
 * @param {string} label - Input field label text.
 * @param {object} config - Optional extra register configuration parameters for the input.
 * @param {string} description - Optional description for the input.
 */

const DateTimeField = ({id, config, ...rest}) => {
    const [isActive,toggleActive] = useToggle();
    const { register, setValue } = useFormContext();
    const [date,setDate] = useState(); //iso date

    const checkDate = useCallback((v)=>{
        const targetDate = parse(v,'yyyy.M.d H:mm',new Date());
        return targetDate != "Invalid Date" ? targetDate : false;
    },[])

    const selectDate = useCallback((date)=>{
        setDate(date); //iso
        setValue(id, format(new Date(date),'yyyy.M.d H:mm',{locale:hu}),{shouldValidate:true}); //reformatted
    },[]);

    const isEmpty = useCallback((val) => {
        return val === "" ? true : checkDate(val);
    },[])

    const {onChange, ...restOfRegister} = register(id,{...config,validate:{
        isDate:v => isEmpty(v) || "Érvénytelen dátum és idő"
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
                icons={faCalendar} 
                ariaRole={"Dátum és idő választó megnyitása"}
            >
                <Modal open={isActive} setOpen={toggleActive}>
                    <DateTimePicker onChange={selectDate} value={date} />
                </Modal>
            </InputFieldWithButton>
        </>

    )
}
export default DateTimeField;

DateTimeField.propTypes = {
    /** the id the inputfield is added to the form with */
    id: PropTypes.string.isRequired,

    /** Optional extra configuration parameters for the registered input */
    config: PropTypes.object,
}