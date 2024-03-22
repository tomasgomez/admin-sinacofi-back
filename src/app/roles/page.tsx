"use client";
import EnhancedTable from "@/components/Table";
import { Alignment, Columns, Data } from "@/components/Table/type";
import { InfoOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { mockData } from "./mock-data";
import Header from "@/components/Table/header";
import ProfileDetailsModal from "./ProfileDetailsModal";
import { getAreas, getInstitutions } from "../users/services";

const AllOption = {
  value: "all",
  label: "Todas"
};

type modalStateType = { open: boolean, data: Data |null };

const initialModalState: modalStateType = { open: false, data: null };

const Users = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [modalState, setModalState] = useState<modalStateType>(initialModalState);
  const [institutionList, setInstitutionList] = useState<any[]>([]);
  const [areaList, setAreaList] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 1000);
    }
    setLoading(true);
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
        id: "userGroup",
        label: "Grupo",
        align: Alignment.LEFT,
      },
      {
        id: "profile",
        label: "Perfil",
        align: Alignment.LEFT,
      },
      {
        id: "numberOfInstitutions",
        label: "Número de Instituciones",
        align: Alignment.LEFT,
      },
     
      {
        id: "numberOfUsers",
        label: "Número de Usuarios",
        align: Alignment.LEFT,
      },
      {
        id: "actions",
        label: "Acciones",
        align: Alignment.LEFT,
        render: ({ value, row }: { value: any, row: any }) => {
          return (
            <IconButton aria-label="Editar"  size="small" onClick={() => onEditUser(row)}>
              <InfoOutlined fontSize="small"  />
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
        title="Roles y Perfiles"
        label="Institución"
        filters={[
          {
            label: "Institutición",
            list: institutionList,
            width: "206px",
            defaultValue: "all"
          },
          {
            label: "Área",
            list: areaList,
            width: "197px",
            defaultValue: "all"
          }
        ]}
      />
      {!loading && (
        <EnhancedTable rows={data} columns={columns} />
      )}
      {modalState.open && <ProfileDetailsModal data={modalState.data} open={modalState.open} onClose={onCloseModal} />}
    </div>
  )
}
export default Users;
