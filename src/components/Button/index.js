import React from "react";
import { Button } from "@mui/material";
import { useFormikContext } from "formik";

const ButtonWrapper = ({children, color, ...otherProps}) => {
    const { submitForm } = useFormikContext();
    const handleSubmit = () => {
        submitForm();
    }
    const configButton = {
        variant: 'contained',
        color: color ? color: 'primary',
        onClick: handleSubmit,
        fullWidth:true
    }
    return(
        <Button {...configButton} style={{marginBottom: '20px'}}>
            {children}
        </Button>
    )
}

export default ButtonWrapper;