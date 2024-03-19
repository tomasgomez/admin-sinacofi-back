"use client";
import EnhancedTable from "@/components/Table";
import { Alignment, Columns, Data } from "@/components/Table/type";
import { EditOutlined } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { mockData } from "../users/mock-data";
import Header from "@/components/Table/header";
import EditUserModal from "./EditUserModal";

const institutionList = [
  {
    label: "Todas",
    value: "all",
  },
  {
    label: "039 - Banco Itaú",
    value: "039",
  },
  {
    label: "031 - HSBC",
    value: "031",
  },
  {
    label: "016 - BCI",
    value: "016",
  },
  {
    label: "041 - JP Morgan",
    value: "041",
  },
  {
    label: "049 - Security",
    value: "049",
  },
];

const areaList = [
  {
    label: "Todas",
    value: "all",
  },
  {
    label: "05 - Operación TID ",
    value: "05",
  },
  {
    label: "10 - TESORERIA INTEGRAL",
    value: "10",
  },
  {
    label: "12 - CONTABILIDAD",
    value: "12",
  },
  {
    label: "15 -  PASIVOS",
    value: "15",
  },
  {
    label: "20 - TARJETAS BANCARIAS",
    value: "20",
  },
];

type modalStateType = { open: boolean, data: Data |null };

const initialModalState: modalStateType = { open: false, data: null };

const Users = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [modalState, setModalState] = useState<modalStateType>(initialModalState);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/user');
      const result = await response.json();
      setData(result);
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }, []);

  const onEditUser = useCallback((row: Data) => {
    setModalState({ open: true, data: row });
  }, []);
  
  const onCloseModal = useCallback(() => {
    setModalState(initialModalState);
  }, [])

  const columns = useMemo(() => {
    const columnList: Columns[] = [
      {
        id: "dni",
        label: "RUT",
        align: Alignment.CENTER,
      },
      {
        id: "publicName",
        label: "Nombre Publico",
        align: Alignment.LEFT,
      },
      {
        id: "userGroup",
        label: "Grupo",
        align: Alignment.LEFT,
      },
      {
        id: "institutionCode",
        label: "Institucion",
        align: Alignment.LEFT,
      },
      {
        id: "areaCode",
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
        render: ({ value, row }: { value: any, row: any }) => {
          return (
            <IconButton aria-label="Editar"  size="small" onClick={() => onEditUser(row)}>
              <EditOutlined fontSize="small"  />
            </IconButton>
          );
        },
      },
    ];
    return columnList;
  }, [onEditUser])

  return (
    <div style={{
      color: "#000000",
      padding: "32px 24px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "32px",
    }}>
      <Header
        title="Usuarios"
        label="Institución"
        filters={[
          {
            label: "Institutición",
            list: institutionList,
            width: "206px",
            defaultValue: "all"
          },
          {
            label: "Area",
            list: areaList,
            width: "197px",
            defaultValue: "all"
          }
        ]}
        withSearchBar
      />
      {!loading && (
        <EnhancedTable rows={data} columns={columns} />
      )}
      {modalState.open && <EditUserModal data={modalState.data} open={modalState.open} onClose={onCloseModal} />}
    </div>
  )
}
export default Users;
