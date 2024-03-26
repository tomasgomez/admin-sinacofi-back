import React, { useEffect, useMemo } from "react";
import { Modal } from "@/components/Modal";
import Dropdrown from "@/components/Dropdown";
import { Button, Stack, Typography } from "@mui/material";
import Field from "@/components/Field";
import { montserrat } from "@/utils/fonts";
import ModalSwitch from "./modal-switch";
import { replaceEmptyStrings } from "@/utils/utils";
import { createData } from "./api-calls";
import { MyContexArea } from "./context";
import { getInstitutions } from "./services";
import {
  addOption,
  generateInstitutionsOptions,
  isFieldDisabled,
  formatId,
} from "./utils";
import { conectivityTypeOptions } from "./contants";
import { MyContexLayout } from "@/app/context";
import { updateData } from "./api-calls";

const ModalAreaContent = ({ onClose }: { onClose: any }) => {
  const { isEdit, selectedRow, getNewData } = React.useContext(
    MyContexArea
  ) as any;

  const { setModalState } = React.useContext(MyContexLayout) as any;

  const [institutions, setInstitutions] = React.useState<any[]>([]);

  const [modalData, setModalData] = React.useState(
    replaceEmptyStrings(selectedRow) || {}
  );

  useEffect(() => {
    getInstitutions().then((institutions: any) => {
      setInstitutions(generateInstitutionsOptions(institutions));
    });
  }, []);

  const handleChangeNumeric = (field: string, value: any) => {
    handleChange(field, formatId(value, 2));
  };

  const handleChange = (field: string, value: any) => {
    setModalData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = async (modalData: any, isEdit?: boolean) => {
    if (isEdit) {
      setModalState({
        type: "decision",
        title: "¿Quieres Editar esta área?",
        body: (
          <Typography
            fontSize={14}
            fontWeight={400}
            style={{ paddingBottom: 16 }}
          >
            {modalData?.id} - {modalData?.name}
          </Typography>
        ),
        isOpen: true,
        onConfirm: async () => {
          await updateData(modalData?.id, modalData);
          onClose(true);
        },
      });
    } else {
      try {
        await createData(modalData);
        onClose(false);
        setModalState({
          type: "success",
          title: "Área Creada Exitosamente",
          body: (
            <>
              <Typography fontSize={14} fontWeight={400}>
                Codigo: {modalData?.id || "-"}
              </Typography>
              <Typography fontSize={14} fontWeight={400}>
                Area: {modalData?.name || "-"}
              </Typography>
            </>
          ),
          isOpen: true,
          onConfirm: () => getNewData(),
        });
      } catch (error) {
        setModalState({
          type: "error",
          title: "Lo sentimos no se pudo crear el área.",
          body: <Typography>El código de área ya esta asignado.</Typography>,
          isOpen: true,
          onClose: () => onClose(),
        });
      }
    }
  };

  const disabledField = useMemo(
    () => isFieldDisabled(modalData?.conectivityType),
    [modalData?.conectivityType]
  );

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
            label="Código Área"
            value={modalData?.id}
            disabled={isEdit}
            onChange={(e: any) => handleChangeNumeric("id", e)}
            width={143}
          />
          <Field
            label="Nombre de Área"
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
            label="Descripción"
            value={modalData?.description}
            onChange={(e: any) => handleChange("description", e)}
            width={364}
          />
          <Dropdrown
            label="Tipo de conectividad"
            width={236}
            options={addOption(
              conectivityTypeOptions,
              selectedRow?.conectivityType
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
          <Field
            label="Mensajes Almacenados"
            value="1000"
            disabled
            width={236}
          />
          <Dropdrown
            label="Instituciones"
            width={364}
            selected={modalData?.institutionCode}
            onChange={(e: any) => handleChange("institutionCode", e)}
            options={addOption(institutions, selectedRow?.institutionCode)}
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
        <Field label="Código FTI" disabled value="Ninguno" width={300} />
        <Field label="Tiempo de Acceso" disabled value="0" width={300} />
      </Stack>

      <Typography
        variant="h6"
        fontSize={16}
        style={{ marginBottom: 16 }}
        fontFamily={montserrat.style.fontFamily}
      >
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
          disabled={disabledField}
          value={modalData?.distributionPath}
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
          disabled={disabledField}
          value={modalData?.pathPams}
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
          disabled={disabledField}
          value={
            modalData?.conectivityType === "Browser" && !isEdit
              ? "-"
              : modalData?.pathSams
          }
          onChange={(e: any) => handleChange("pathSams", e)}
        />
      </Stack>

      <Stack direction="row" justifyContent="flex-end" gap="12px">
        <Button
          variant="outlined"
          onClick={onClose}
          style={{
            textTransform: "none",
            fontFamily: montserrat.style.fontFamily,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{
            color: "white",
            textTransform: "none",
            fontFamily: montserrat.style.fontFamily,
          }}
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
      <Modal maxWidth={700} open={isModalOpen} onClose={() => onClose(false)}>
        <ModalAreaContent onClose={onClose} />
      </Modal>
    </div>
  );
};

export default ModalArea;
