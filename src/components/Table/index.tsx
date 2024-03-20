"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { TableHeader } from "./components/table-header-inbox";
import TableContentRows from "./components/table-rows-inbox";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { StyledTabCell } from "./style";
import { Data, Order } from "./type";
import { getComparator, stableSort } from "./utils";

type TablePropsType = {
  withCheckbox?: boolean;
  withPagination?: boolean;
  withSwitch?: boolean;
  rows: any[];
  columns: any[];
  rowOptions?: any;
  defaultOrderKey?: keyof Data;
  minWidth?: number | string;
};

export default function EnhancedTable({
  withCheckbox,
  withSwitch,
  withPagination = true,
  rows = [],
  columns = [],
  rowOptions = {},
  defaultOrderKey,
  minWidth = 750
}: TablePropsType) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>(
    defaultOrderKey ? defaultOrderKey : columns[0].id
  );
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.rut);
      // setSelected(newSelected);
      return;
    }
    // setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, rows, page, rowsPerPage]
  );

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      {/* Definir tamaño de la tabla */}
      <TableContainer sx={{ maxHeight: 456, maxWidth: 1200 }}>
        <Table
          sx={{ minWidth }}
          aria-labelledby="tableTitle"
          size="medium"
          stickyHeader
          width="1200px"
        >
          <TableHeader
            withCheckboxAll={withCheckbox}
            withStatusSwitch={withSwitch}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            columns={columns}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              // const isItemSelected = isSelected(row.rut);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableContentRows
                  withCheckbox={withCheckbox}
                  withSwitch={withSwitch}
                  key={`row-table-data-${index}`}
                  row={row}
                  rowOptions={rowOptions}
                  columns={columns}
                  labelId={labelId}
                  // isItemSelected={isItemSelected}
                  handleClick={handleClick}
                />
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 57 * emptyRows,
                }}
              >
                <StyledTabCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {withPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 7, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
