
export interface Data {
  code: string;
  name: string;
  type: string;
  institutions: string;
  distributionAddress: string;
  pamsAddress: string;
  FTAddress: string;
  acctions: any;
}

export enum Alignment {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export interface Columns {
  id: keyof Data;
  label: string;
  align: Alignment;
  render?: any;
}
