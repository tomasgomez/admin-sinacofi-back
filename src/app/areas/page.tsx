"use client";
import EnhancedTable from "@/components/Table";
import { Data } from "./type";
import React, {
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";
import Header from "@/components/Table/header";
import { columns, rowOptions } from "./contants";
import ModalArea from "./modal-area";
import { EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getData, deleteData, updateData } from "./api-calls";
import ModalSuccess from "@/components/ModalSuccessArea";
import { MyContexArea } from "./context";
import ModalDecision from "@/components/ModalDecisionArea";

const Areas = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Data | null>(null);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState<boolean>(false);
  const [isEditConfirmationModalOpen, setIsEditConfirmationModalOpen] =
    useState<boolean>(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState<boolean>(false);
  const [dataModal, setDataModal] = useState<any>({});

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
            aria-label="Editar"
            size="small"
            onClick={() => {
              setDataModal({ id: row.id, name: row?.name });
              setIsDeleteConfirmationModalOpen(true);
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
        setIsModalSuccessOpen,
        isEdit,
        selectedRow,
        setDataModal,
        setIsEditConfirmationModalOpen,
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
        {!loading && (
          <EnhancedTable
            withSwitch
            rowOptions={rowOptions}
            rows={data}
            columns={newColumns}
            onChangeSwitch={handleOnChangeSwitch}
          />
        )}
      </div>
      <ModalArea isModalOpen={isModalOpen} onClose={handleCloseModal} />
      <ModalSuccess
        isOpen={isModalSuccessOpen}
        onClose={() => {
          setIsModalSuccessOpen(false);
          getNewData();
        }}
        title="Área Creada Exitosamente"
        code={dataModal?.code}
        area={dataModal?.area}
      />
      <ModalDecision
        isOpen={isDeleteConfirmationModalOpen}
        onClose={() => {
          setIsDeleteConfirmationModalOpen(false);
          setDataModal({});
        }}
        onConfirm={async () => {
          setIsDeleteConfirmationModalOpen(false);
          await handleDelete(dataModal?.id);
          setDataModal({});
        }}
        title="¿Quieres a eliminar esta área y toda su configuración?"
        code={dataModal?.id}
        area={dataModal?.name}
      />
      <ModalDecision
        isOpen={isEditConfirmationModalOpen}
        onClose={() => {
          setIsEditConfirmationModalOpen(false);
          setDataModal({});
        }}
        onConfirm={async () => {
          setIsEditConfirmationModalOpen(false);
          await updateData(dataModal.id, dataModal);
          handleCloseModal(true);
          setDataModal({});
        }}
        title="¿Quieres a Editar esta área?"
        code={dataModal?.id}
        area={dataModal?.name}
      />
    </MyContexArea.Provider>
  );
};
export default Areas;
