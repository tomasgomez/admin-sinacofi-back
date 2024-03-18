import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { EnhancedTableProps, Data } from "../type";
import { StyledTableCellHeader } from "../style";
import TableSortLabel from "@mui/material/TableSortLabel";

export function TableHeader(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    withCheckboxAll,
    withStatusSwitch,
    columns = [],
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {withCheckboxAll && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}
        {withStatusSwitch && (
          <StyledTableCellHeader>Estado</StyledTableCellHeader>
        )}
        {columns.map((columnsData) => (
          <StyledTableCellHeader
            key={columnsData.id}
            align={columnsData.align}
            padding="normal"
            sortDirection={orderBy === columnsData.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === columnsData.id}
              direction={orderBy === columnsData.id ? order : "asc"}
              onClick={createSortHandler(columnsData.id)}
            >
              {columnsData.label}
            </TableSortLabel>
          </StyledTableCellHeader>
        ))}
      </TableRow>
    </TableHead>
  );
}