import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
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
  rowOptions?: any;
};

const CustomCell = ({
  value,
  render: Component,
  row,
  rowOptions,
}: CustomCellType) => {
  return (
    <StyledTabCell
      component="th"
      // id={}
      scope="row"
      {...rowOptions}
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
    rowOptions,
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
          <StyledTabCell padding="checkbox" {...rowOptions[row.id]}>
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
        {withSwitch && (
          <StyledTabCell>
            <TableSwitch
              onChange={() => console.log("Switch Change")}
              checked={row?.isActive}
            />
          </StyledTabCell>
        )}
        {/* ///////////////////////  Rows /////////////////////// */}
        {columns.map((column: any, idx: number) => (
          <CustomCell
            key={`row-${column.id}-${idx}`}
            value={row[column.id] || "-"}
            row={row}
            render={column.render}
            rowOptions={rowOptions[column.id]}
          />
        ))}
      </TableRow>
    </>
  );
}

export default TableContentRows;
