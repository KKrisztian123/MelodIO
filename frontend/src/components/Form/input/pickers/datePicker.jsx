import * as React from "react";
import { StaticDatePicker } from "@mui/x-date-pickers";
import './datepicker.scss';
import { format } from "date-fns";
import {hu} from 'date-fns/locale';

const DatePicker = ({onChange,value}) => {
    return(
        <StaticDatePicker
            renderInput={()=>{}}
            onChange={onChange}
            displayStaticWrapperAs="desktop"
            showToolbar
            ToolbarComponent={DatePickerToolbar}
            value={value}
            className="datepicker"
        />
    )
}

const DatePickerToolbar = ({parsedValue,...rest}) => {
    return(
        <div className="datepicker-block">
            <p className="datepicker-title">Válassz dátumot</p>
            <p className="datepicker-date">{format(new Date(parsedValue),'MMMM d',{locale:hu})}</p>
        </div>
    )
}

export default DatePicker;