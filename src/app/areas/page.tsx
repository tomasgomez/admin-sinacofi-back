"use client";
import EnhancedTable from "@/components/Table";
import { Alignment, Columns, Data } from "@/components/Table/type";
import { EditOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { mockData } from "./mock-data";
import Header from "@/components/Table/header";

const columns: Columns[] = [
  {
    id: "rut",
    label: "RUT",
    align: Alignment.CENTER,
  },
  {
    id: "publicName",
    label: "Nombre Publico",
    align: Alignment.LEFT,
  },
  {
    id: "group",
    label: "Grupo",
    align: Alignment.LEFT,
  },
  {
    id: "institution",
    label: "Institucion",
    align: Alignment.LEFT,
  },
  {
    id: "area",
    label: "Area",
    align: Alignment.LEFT,
  },
  {
    id: "status",
    label: "Estado",
    align: Alignment.LEFT,
  },
  {
    id: "actions",
    label: "Acciones",
    align: Alignment.LEFT,
    render: ({ value }: { value: any }) => {
      return (
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
      );
    },
  },
];

const institutionList = [
  {
    label: "039 - Banco Itaú",
    id: "039",
    width: "206px",
  },
  {
    label: "031 - HSBC",
    id: "031",
    width: "206px",
  },
  {
    label: "016 - BCI",
    id: "016",
    width: "206px",
  },
  {
    label: "041 - JP Morgan",
    id: "041",
    width: "206px",
  },
  {
    label: "049 - Security",
    id: "049",
    width: "206px",
  },
];

const areaList = [
  {
    label: "05 - Operación TID ",
    id: "05",
    width: "206px",
  },
  {
    label: "10 - TESORERIA INTEGRAL",
    id: "10",
    width: "206px",
  },
  {
    label: "12 - CONTABILIDAD",
    id: "12",
    width: "206px",
  },
  {
    label: "15 -  PASIVOS",
    id: "15",
    width: "206px",
  },
  {
    label: "20 - TARJETAS BANCARIAS",
    id: "20",
    width: "206px",
  },
];

const Users = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        color: "#000000",
        padding: "32px 24px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      {/* <Typography variant="h5">Usuarios</Typography> */}
      <Header title="Areas" label="Institución" addLabelButton="Agregar Area" />
      {!loading && <EnhancedTable rows={data} columns={columns} />}
    </div>
  );
};
export default Users;
