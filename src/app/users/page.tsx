"use client";
import EnhancedTable from "@/components/Table";
import { Alignment, Columns, Data } from "@/components/Table/type";
import { EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Table/header";
import EditUserModal from "./EditUserModal";
import { getAreas, getInstitutions } from "./services";
// import { areaList, institutionList } from "./mock-data";

type modalStateType = { open: boolean, data: Data |null };

const initialModalState: modalStateType = { open: false, data: null };

const AllOption = {
  value: "all",
  label: "Todas"
};

const Users = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [institutionList, setInstitutionList] = useState<any[]>([]);
  const [areaList, setAreaList] = useState<any[]>([]);
  const [modalState, setModalState] = useState<modalStateType>(initialModalState);

  async function fetchData() {
    setLoading(true);
    const response = await fetch('/api/user');
    const result = await response.json();
    setData(result);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    getInstitutions().then((institutions) => {
      setInstitutionList([AllOption, ...institutions.map((institution: any) => ({
        value: institution.id,
        label: `${institution.id} - ${institution.name}`
      }))]);
    });
    getAreas().then((areas) => {
      setAreaList([AllOption, ...areas.map((area: any) => ({
        value: area.id,
        label: `${area.id} - ${area.name}`
      }))])
    });
  }, []);

  const onEditUser = useCallback((row: Data) => {
    setModalState({ open: true, data: row });
  }, []);
  
  const onCloseModal = useCallback((isSubmit: boolean) => {
    typeof isSubmit === "boolean" && isSubmit && fetchData();
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
        label="Buscar Usuario por RUT..."
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
