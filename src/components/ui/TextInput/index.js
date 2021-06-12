import React from "react";
import { TextField } from "@material-ui/core";
export const TextInput = ({
  name,
  value,
  label,
  margin = "normal",
  fullWidth=true,
  placeholder,
  onChange,
  type = "text",
  variant = "outlined",
  ...props
}) => {
 
  return (
    <TextField
      fullWidth={fullWidth}
      margin={margin}
      variant={variant}
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={props.onBlur}
      error={props.error}
      helperText={props.helperText}
      type={type}
    />
  );
};
