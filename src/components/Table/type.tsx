// export interface Data {
//   id: number;
//   osn: number;
//   ms: number;
//   message: string;
//   institution: string;
//   date: string;
//   time: string;
//   state: number;
//   stateProgress: string;
// }
export interface Data {
  rut: string;
  publicName: string;
  group: string;
  institution: string;
  area: string;
  status: number;
}

export type Order = "asc" | "desc";

export interface Columns {
  id: keyof Data;
  label: string;
  align: Alignment;
  render?: any;
}

export interface RowOptions {
  [key: string]: Options;
}

interface Options {
  maxwidth?: number;
  minwidth?: number;
  isBlod?: boolean;
  align?: Alignment;
  fontSize?: number;
}

export enum Alignment {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
};

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  withCheckboxAll?: boolean;
  withStatusSwitch?: boolean;
  columns?: any[];
}

export interface TableProps {
  withCheckbox?: boolean;
  withSwitch?: boolean;
  labelId: string;
  row: any;
  columns: any;
  isItemSelected?: boolean;
  handleClick: (event: React.MouseEvent<unknown>, id: number) => void;
}
