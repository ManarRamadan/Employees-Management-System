import React from "react";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

export const UIButton = ({
  title,
  color = "default",
  size = "medium",
  variant = "contained",
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  ...props
}) => {
  return (
    <Button
      color={color}
      size={size}
      type={type}
      disabled={disabled || loading}
      variant={variant}
      onClick={onClick}
      {...props}
    >
      {loading && <CircularProgress />} {title}
    </Button>
  );
};
