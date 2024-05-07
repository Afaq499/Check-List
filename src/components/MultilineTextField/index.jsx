import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const MultilineTextField = ({ label, 
  rows,
  name, 
  handleChange,
  handleBlur,
  value,
  error,
  touched,
  helperText
}) => {

  return (
    <TextField
      id="multiline-textfield"
      label={label}
      name={name}
      multiline
      rows={rows}
      variant="outlined"
      value={value}
      onChange={handleChange}
      handleBlur={handleBlur}
      fullWidth
      error={error}
      helperText={helperText}
      onBlur={handleBlur}
      touched={touched}

    />
  );
};

export default MultilineTextField;
