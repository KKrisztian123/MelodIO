import * as React from "react";
import { StaticTimePicker } from "@mui/x-date-pickers";
import './datepicker.scss';
import { format } from "date-fns";
import {hu} from 'date-fns/locale';

const TimePicker = ({onChange,value}) => {
    return(
        <StaticTimePicker
            renderInput={()=>{}}
            onChange={onChange}
            displayStaticWrapperAs="desktop"
            showToolbar
            ToolbarComponent={TimePickerToolbar}
            value={value}
            className="datepicker"
        />
    )
}

const TimePickerToolbar = ({parsedValue,...rest}) => {
    return(
        <div className="datepicker-block">
            <p className="datepicker-title">Válassz időt</p>
            <p className="datepicker-date">{format(new Date(parsedValue),'H:mm',{locale:hu})}</p>
        </div>
    )
}

export default TimePicker;