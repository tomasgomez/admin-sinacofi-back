import { Alignment, Columns } from "./type";
import { EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const columns: Columns[] = [
  {
    id: "id",
    label: "Código",
    align: Alignment.LEFT,
  },
  {
    id: "name",
    label: "Nombre",
    align: Alignment.LEFT,
  },
  {
    id: "conectivityType",
    label: "Typo",
    align: Alignment.LEFT,
  },
  {
    id: "institutionCode",
    label: "Instituciones",
    align: Alignment.LEFT,
  },
  {
    id: "distributionPath",
    label: "Dirección de distribucion",
    align: Alignment.LEFT,
  },
  {
    id: "pathPams",
    label: "Dirección PAMS",
    align: Alignment.LEFT,
  },
  { id: "pathSams", label: "Dirección FT", align: Alignment.LEFT },
];

export const rowOptions = {
  id: { maxwidth: 110, align: Alignment.LEFT },
  name: { maxwidth: 190, align: Alignment.LEFT },
  conectivityType: { maxwidth: 110, align: Alignment.LEFT },
  institutionCode: {
    maxwidth: 120,
    align: Alignment.LEFT,
  },
  distributionPath: {
    maxwidth: 180,
    align: Alignment.LEFT,
  },
  pathPams: { maxwidth: 180, align: Alignment.LEFT },
  pathSams: { maxwidth: 180, align: Alignment.LEFT },
  acctions: { maxwidth: 120, align: Alignment.LEFT },
};