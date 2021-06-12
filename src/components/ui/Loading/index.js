import React from "react";
import { CircularProgress } from "@material-ui/core";

export const Loading = () => {
  return (
    <div>
      <CircularProgress color="secondary" size="12px" />
      &nbsp;Loading...
    </div>
  );
};
