import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText
} from '@mui/material';

const DropDown = ({ name ,label, options, value, onChange, hasError, onBlur }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`${hasError ? 'demo-simple-select-error-label' : ''}`}>{label}</InputLabel>
      <Select
        name={name}
        onBlur={onBlur}
        value={selectedValue}
        onChange={handleChange}
        labelId={`${hasError ? 'demo-simple-select-error-label' : ''}`}
        id="demo-simple-select-error"
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText style={{color:'red'}}>{hasError}</FormHelperText>}
     </FormControl>
  )
}

export default DropDown;
