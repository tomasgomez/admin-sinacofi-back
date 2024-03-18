import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { rowOptions } from "../constants";
import {
  StyledTabCell,
  StyledChip,
  StyledMessageContiner,
  StyledMessage,
} from "../style";
import { TableProps } from "../type";
import Link from "@mui/material/Link";
import TableSwitch from "./table-switch";

type CustomCellType = {
  value: any;
  render: any;
  row: any;
};

const CustomCell = ({ value, render: Component, row }: CustomCellType) => {
  return (
    <StyledTabCell
      component="th"
      // id={}
      scope="row"
      {...rowOptions["osn"]}
    >
      {/* <Link
        component="button"
        variant="body2"
        onClick={() => {
          console.info("the label is: " + row.osn);
        }}
        style={{ color: "#00B2E2" }}
      > */}
      {Component ? <Component value={value} row={row} /> : value}
      {/* </Link> */}
    </StyledTabCell>
  );
};

export function TableContentRows(props: TableProps) {
  const {
    handleClick,
    row,
    isItemSelected,
    labelId,
    withCheckbox,
    withSwitch,
    columns,
  } = props;

  return (
    <>
      <TableRow
        hover
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
      >
        {/* /////////////////////// checkbox /////////////////////// */}
        {withCheckbox && (
          <StyledTabCell padding="checkbox" {...rowOptions["checkbox"]}>
            <Checkbox
              onClick={(event) => handleClick(event, row.id)}
              color="primary"
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
          </StyledTabCell>
        )}
        {withSwitch && <TableSwitch />}
        {/* ///////////////////////  Rows /////////////////////// */}
        {columns.map((column: any, idx: number) => (
          <CustomCell
            key={`row-${column.id}-${idx}`}
            value={row[column.id]}
            row={row}
            render={column.render}
          />
        ))}
      </TableRow>
    </>
  );
}

export default TableContentRows;
