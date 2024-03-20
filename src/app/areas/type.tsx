
export interface Data {
  id: string;
  name: string;
  description: string;
  institutionCode: string;
  distributionPath: string;
  pathPams: string;
  pathSams: string;
  ftiiCode: string;
  acctions: any;
  conectivityType: string;
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
