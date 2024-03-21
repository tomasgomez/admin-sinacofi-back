import * as React from "react";
import { Modal } from "@/components/Modal";
import Dropdrown from "@/components/Dropdown";
import { Button, Stack, Typography } from "@mui/material";
import Field from "@/components/Field";
import { montserrat, roboto } from "@/utils/fonts";
import ModalSwitch from "./modal-switch";
import { replaceEmptyStrings } from "@/utils/utils";
import { createData, updateData } from "./api-calls";
import { MyContexArea } from "./context";

function completeObjectWithEmptyValues(obj: any) {
  const emptyObject = {
    id: "",
    name: "",
    description: "",
    institutionCode: "",
    distributionPath: "",
    pathPams: "",
    pathSams: "",
    ftiiCode: "",
    conectivityType: "",
    isActive: false,
  };

  return { ...emptyObject, ...obj };
}

const ModalAreaContent = ({ onClose }: { onClose: any }) => {
  const {
    setIsModalSuccessOpen,
    isEdit,
    selectedRow,
    setDataModal,
    setIsEditConfirmationModalOpen,
  } = React.useContext(MyContexArea) as any;

  const [modalData, setModalData] = React.useState(
    replaceEmptyStrings(selectedRow) || {}
  );

  const addOption = (array: any, field: string) => {
    if (!selectedRow) return array;
    if (!modalData[field]) return array;
    return [...array, { value: modalData[field], label: modalData[field] }];
  };

  const handleChange = (field: string, value: any) => {
    setModalData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = (modalData: any, isEdit?: boolean) => {
    if (isEdit) {
      setDataModal(modalData);
      setIsEditConfirmationModalOpen(true);
    } else {
      createData(completeObjectWithEmptyValues(modalData));
      setDataModal({ code: modalData?.id, area: modalData?.name });
      onClose(true);
      setIsModalSuccessOpen(true);
    }
  };

  return (
    <>
      <Stack rowGap={"20px"} direction="column" mb="24px">
        <Stack
          columnGap={"20px"}
          direction="row"
          justifyContent="space-between"
          display="flex"
          alignItems="center"
          style={{ marginBottom: 16 }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            fontFamily={montserrat.style.fontFamily}
          >
            {isEdit ? "Editar Área" : "Agregar Área"}
          </Typography>
          {isEdit && (
            <Stack
              columnGap={"20px"}
              direction="row"
              justifyContent="space-between"
              display="flex"
              alignItems="center"
              marginRight={4}
            >
              <ModalSwitch
                checked={modalData?.isActive}
                onChange={(e: any) =>
                  handleChange("isActive", !modalData?.isActive)
                }
              />
              <Stack direction="column" justifyContent="space-between">
                <Typography variant="subtitle2" fontSize={14}>
                  Estado
                </Typography>
                <Typography variant="subtitle1" fontSize={14}>
                  {modalData?.isActive ? "Activa" : "Inactiva"}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
        <Stack
          columnGap={"20px"}
          direction="row"
          justifyContent="space-between"
        >
          <Field
            label="Codigo Area"
            value={modalData?.id}
            disabled={isEdit}
            onChange={(e: any) => handleChange("id", e)}
            width={143}
          />
          <Field
            label="Nombre de Area"
            value={modalData?.name}
            onChange={(e: any) => handleChange("name", e)}
            width={457}
          />
        </Stack>
        <Stack
          columnGap={"20px"}
          direction="row"
          justifyContent="space-between"
        >
          <Field
            label="Descripcion"
            value={modalData?.description}
            onChange={(e: any) => handleChange("description", e)}
            width={364}
          />
          <Dropdrown
            label="Tipo de conectividad"
            width={236}
            options={addOption(
              [
                { value: "Browser", label: "Browser" },
                { value: "FileServer", label: "File Server" },
                { value: "FileTransfer", label: "File Transfer" },
              ],
              "conectivityType"
            )}
            selected={modalData.conectivityType}
            onChange={(e: any) => handleChange("conectivityType", e)}
          />
        </Stack>
        <Stack
          columnGap={"20px"}
          direction="row"
          justifyContent="space-between"
        >
          <Field label="Mensajes Almacenados" value="-" disabled width={236} />
          <Dropdrown
            label="Instituciones"
            width={364}
            selected={modalData?.institutionCode}
            onChange={(e: any) => handleChange("institutionCode", e)}
            options={addOption([], "institutionCode")}
          />
        </Stack>
      </Stack>
      <Stack
        columnGap={"20px"}
        direction="row"
        justifyContent="space-between"
        display="flex"
        alignItems="center"
        style={{ marginBottom: 16 }}
      >
        <Typography
          variant="h6"
          fontSize={16}
          fontWeight="bold"
          fontFamily={montserrat.style.fontFamily}
        >
          Configuracion FTI
        </Typography>
        <Typography variant="subtitle2" fontSize={12}>
          Solo para File Server o File Transfer
        </Typography>
      </Stack>
      <Stack
        columnGap={"20px"}
        direction="row"
        justifyContent="space-between"
        style={{ marginBottom: 16 }}
      >
        <Field label="Direccion IP Remota" disabled value="-" width={620} />
      </Stack>

      <Stack
        columnGap={"20px"}
        direction="row"
        justifyContent="space-between"
        style={{ marginBottom: 16 }}
      >
        <Field label="Nombre de Usuario" disabled value="-" width={193} />
        <Field
          label="Password"
          // type="password"
          disabled
          value="-"
          width={193}
        />
        <Field
          label="Configuracion de Password"
          // type="password"
          disabled
          value="-"
          width={193}
        />
      </Stack>

      <Stack
        columnGap={"20px"}
        direction="row"
        justifyContent="space-between"
        style={{ marginBottom: 16 }}
      >
        <Field label="Codigo FTI" disabled value="Ninguno" width={300} />
        <Field label="Tiempo de Acceso" disabled value="0" width={300} />
      </Stack>

      <Typography variant="h6" fontSize={16} style={{ marginBottom: 16 }}>
        Directorios
      </Typography>

      <Stack
        columnGap={"20px"}
        direction="row"
        justifyContent="space-between"
        display="flex"
        alignItems="center"
        style={{ marginBottom: 16 }}
      >
        <Typography variant="subtitle1" fontSize={14}>
          Distribución (TAMS)
        </Typography>
        <Field
          label="Ruta"
          width={447}
          disabled
          value={modalData?.distributionPath || "-"}
          onChange={(e: any) => handleChange("distributionPath", e)}
        />
      </Stack>

      <Stack
        columnGap={"20px"}
        direction="row"
        justifyContent="space-between"
        display="flex"
        alignItems="center"
        style={{ marginBottom: 16 }}
      >
        <Typography variant="subtitle1" fontSize={14}>
          Recepción (PAMS)
        </Typography>
        <Field
          label="Ruta"
          disabled
          value={modalData?.pathPams || "-"}
          onChange={(e: any) => handleChange("pathPams", e)}
          width={447}
        />
      </Stack>

      <Stack
        columnGap={"20px"}
        direction="row"
        justifyContent="space-between"
        display="flex"
        alignItems="center"
        style={{ marginBottom: 16 }}
      >
        <Typography variant="subtitle1" fontSize={14}>
          FTP
        </Typography>
        <Field
          label="Ruta"
          width={447}
          disabled
          value={modalData?.pathSams || "-"}
          onChange={(e: any) => handleChange("pathSams", e)}
        />
      </Stack>

      <Stack direction="row" justifyContent="flex-end" gap="12px">
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => handleSave(modalData, isEdit)}
        >
          Guardar
        </Button>
      </Stack>
    </>
  );
};

const ModalArea = ({
  isModalOpen,
  onClose,
}: {
  isModalOpen: boolean;
  onClose: any;
}) => {
  return (
    <div>
      <Modal
        maxWidth={700}
        open={isModalOpen}
        onClose={() => onClose(false)}
      >
        <ModalAreaContent onClose={() => onClose(false)} />
      </Modal>
    </div>
  );
};

export default ModalArea;
