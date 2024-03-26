"use client";
import EnhancedTable from "@/components/Table";
import { Data } from "./type";
import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Table/header";
import { columns, rowOptions } from "./contants";
import ModalArea from "./modal-area";
import { EditOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getData, deleteData, updateData } from "./api-calls";
import { MyContexArea } from "./context";
import { MyContexLayout } from "@/app/context";

const Areas = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Data | null>(null);

  const { setModalState } = React.useContext(MyContexLayout) as any;

  const getNewData = async () => {
    setLoading(true);
    const data = await getData();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getNewData();
  }, []);

  const handleOnChangeSwitch = async (id: string, value: boolean) => {
    await updateData(id, { isActive: value });
    const data = await getData();
    setData(data);
  };

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
            aria-label="Delete"
            size="small"
            onClick={() => {
              setModalState({
                type: "decision",
                title: "¿Quieres eliminar esta área y toda su configuración?",
                body: (
                  <Typography
                    fontSize={14}
                    fontWeight={400}
                    style={{ paddingBottom: 16 }}
                  >
                    {row?.id} - {row?.name}
                  </Typography>
                ),
                isOpen: true,
                onConfirm: async () => {
                  await handleDelete(row?.id);
                },
              });
            }}
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
    <MyContexArea.Provider
      value={{
        getNewData,
        isEdit,
        selectedRow,
      }}
    >
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
        <EnhancedTable
          withSwitch
          rowOptions={rowOptions}
          rows={data}
          columns={newColumns}
          loading={loading}
          onChangeSwitch={handleOnChangeSwitch}
        />
      </div>
      <ModalArea isModalOpen={isModalOpen} onClose={handleCloseModal} />
    </MyContexArea.Provider>
  );
};
export default Areas;
