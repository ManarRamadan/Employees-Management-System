
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@material-ui/core';
import { Select } from '../../ui'
import EditIcon from '@material-ui/icons/Edit';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textTransform: 'capitalize'
  },
  body: {
    fontSize: 14,
  },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    // maxHeight: 500
  }
});
export const UITable = ({ schema, data, options, onClick, onChange }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {schema.map((field, index) => (
              <StyledTableCell key={index} >{field}</StyledTableCell>
            ))}
            <StyledTableCell >Status</StyledTableCell>
            <StyledTableCell align="center" >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              {schema.map((field) => (
                <StyledTableCell key={row[field]}>{row[field]}</StyledTableCell>
              ))}
              <StyledTableCell>
                <Select
                  id="status"
                  label="Status"
                  name="status"
                  value={row.status}
                  options={options}
                  onChange={(e) => onChange(e, row)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton onClick={() => onClick(row)} ><EditIcon /></IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

