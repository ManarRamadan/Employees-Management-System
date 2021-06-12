import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import MSelect from "@material-ui/core/Select";
import { homeVariables } from "../../../config/home";


const ITEM_HEIGHT = homeVariables.itemHeight;
const ITEM_PADDING_TOP = homeVariables.itemPaddingTop;

const useStyles = makeStyles((theme) =>({
  formControl: {
    margin: theme.spacing(0),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}))

export const Select = (props) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel style={{ marginLeft: '20px' }} id={`${props.id}-label`} error={props.error}>
        {props.label && props.label}
      </InputLabel>
      <MSelect
        labelId={`${props.id}-label`}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        fullWidth
        variant='outlined'
        label={props.label}
        error={props.error}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left"
          },
          getContentAnchorEl: null,
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
             
            },
          },
        }}
      >
        {props.options?.map((option) => (
          <MenuItem key={option.id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </MSelect>
    </FormControl>
  );
};
