import { Alignment, Columns } from "./type";
import { EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const columns: Columns[] = [
  {
    id: "code",
    label: "Código",
    align: Alignment.LEFT,
  },
  {
    id: "name",
    label: "Nombre",
    align: Alignment.LEFT,
  },
  {
    id: "type",
    label: "Typo",
    align: Alignment.LEFT,
  },
  {
    id: "institutions",
    label: "Instituciones",
    align: Alignment.LEFT,
  },
  {
    id: "distributionAddress",
    label: "Dirección de distribucion",
    align: Alignment.LEFT,
  },
  {
    id: "pamsAddress",
    label: "Dirección PAMS",
    align: Alignment.LEFT,
  },
  { id: "FTAddress", label: "Dirección FT", align: Alignment.LEFT },
  {
    id: "acctions",
    label: "Acciones",
    align: Alignment.CENTER,
    render: ({ value }: { value: any }) => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="Editar"
            size="small"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              console.log({ value });
            }}
          >
            <EditOutlined fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="Editar"
            size="small"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              console.log({ value });
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </div>
      );
    },
  },
];

export const rowOptions = {
  code: { maxwidth: 110, align: Alignment.LEFT },
  name: { maxwidth: 190, align: Alignment.LEFT },
  type: { maxwidth: 110, align: Alignment.LEFT },
  institutions: {
    maxwidth: 120,
    align: Alignment.LEFT,
  },
  distributionAddress: {
    maxwidth: 180,
    align: Alignment.LEFT,
  },
  pamsAddress: { maxwidth: 180, align: Alignment.LEFT },
  FTAddress: { maxwidth: 180, align: Alignment.LEFT },
  acctions: { maxwidth: 120, align: Alignment.LEFT },
};
