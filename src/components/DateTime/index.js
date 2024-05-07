import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

const DateTimePicker = ({name, onChange, ...otherProps}) => {
    
    const [field, mata] = useField(name);
    
    const configDateTimePicker = {
        ...otherProps,
        ...field,
        type: 'date',
        variant: 'outlined',
        fullWidth:'true',
        InputLabelProps: {
            shrink:true
        },
    };
    if(mata && mata.touched && mata.error){
        configDateTimePicker.error = true;
        configDateTimePicker.helperText = mata.error;
    }
    return(
        <TextField 
        {...configDateTimePicker}
        onChange={onChange}        />
    )
}

export default DateTimePicker;