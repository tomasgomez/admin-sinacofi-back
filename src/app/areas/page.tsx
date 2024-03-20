"use client";
import EnhancedTable from "@/components/Table";
import { Data } from "./type";
import React, { useEffect, useMemo, useState } from "react";
// import { mockData } from "./mock-data";
import Header from "@/components/Table/header";
import { columns, rowOptions } from "./contants";
import ModalArea from "./modal-area";
import { EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getData, deleteData } from "./api-calls";

const Areas = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Data | null>(null);

  const getNewData = async () => {
    setLoading(true);
    const data = await getData();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getNewData();
  }, []);

  const handleOpenModalEdit = (row: any) => {
    setSelectedRow(row);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = (wasEdit: boolean) => {
    setIsEdit(false);
    setSelectedRow(null);
    setIsModalOpen(false);
    if (wasEdit) {
      setTimeout(() => {
        getNewData();
      }, 10);
    }
  };

  async function handleDelete(id: string) {
    await deleteData(id);
    setTimeout(() => {
      getNewData();
    }, 10);
  }

  const acciones = {
    id: "acctions",
    label: "Acciones",
    align: "center",
    render: ({ row }: { row: any }) => {
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
            onClick={() => handleOpenModalEdit(row)}
          >
            <EditOutlined fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="Editar"
            size="small"
            onClick={() => handleDelete(row.id)}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </div>
      );
    },
  };

  const newColumns = useMemo(() => {
    return [...columns, acciones];
  }, [columns, acciones]);

  return (
    <>
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
        <Header
          title="Áreas"
          addLabelButton="Agregar Área"
          handleAddLabelButton={() => setIsModalOpen(true)}
        />
        {!loading && (
          <EnhancedTable
            withSwitch
            rowOptions={rowOptions}
            rows={data}
            columns={newColumns}
          />
        )}
      </div>
      <ModalArea
        isModalOpen={isModalOpen}
        isEdit={isEdit}
        onClose={handleCloseModal}
        data={selectedRow}
      />
    </>
  );
};
export default Areas;
