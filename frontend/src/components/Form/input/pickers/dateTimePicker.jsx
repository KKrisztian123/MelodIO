import * as React from "react";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import './datepicker.scss';
import { format } from "date-fns";
import {hu} from 'date-fns/locale';

const DateTimePicker = ({onChange,value}) => {
    return(
        <StaticDateTimePicker
            renderInput={()=>{}}
            onChange={onChange}
            displayStaticWrapperAs="desktop"
            showToolbar
            ToolbarComponent={DateTimePickerToolbar}
            value={value}
            className="datepicker"
        />
    )
}

const DateTimePickerToolbar = ({parsedValue,openView,...rest}) => {
    return(
        <div className="datepicker-block">
            <p className="datepicker-title">Válassz dátumot és időt</p>
            <p className="datepicker-date">
                {["year","day"].includes(openView) && format(new Date(parsedValue),'MMMM d',{locale:hu})}
                {["hours","minutes"].includes(openView) && format(new Date(parsedValue),'H:mm',{locale:hu})}
            </p>
        </div>
    )
}

export default DateTimePicker;