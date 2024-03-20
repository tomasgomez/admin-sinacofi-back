import * as React from "react";
import { Modal } from "@/components/Modal";
import Dropdrown from "@/components/Dropdown";
import { Button, Stack, Typography } from "@mui/material";
import Field from "@/components/Field";

const ModalAreaContent = ({ onClose }: { onClose: any }) => {
  return (
    <>
      <Stack rowGap={"20px"} direction="column" mb="24px">
        <Stack
          columnGap={"20px"}
          direction="row"
          justifyContent="space-between"
        >
          <Field label="Codigo Area" width={143} />
          <Field label="Nombre de Area" width={457} />
        </Stack>
        <Stack
          columnGap={"20px"}
          direction="row"
          justifyContent="space-between"
        >
          <Field label="Descripcion" width={364} />
          <Field label="Tipo de conectividad" width={236} />
        </Stack>
        <Stack
          columnGap={"20px"}
          direction="row"
          justifyContent="space-between"
        >
          <Field label="Mensajes Almacenados" width={236} />
          <Dropdrown label="Instituciones" width={364} options={[]} />
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
          fontFamily={"Montserrat"}
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
        <Field label="Direccion IP Remota" width={620} />
      </Stack>

      <Stack
        columnGap={"20px"}
        direction="row"
        justifyContent="space-between"
        style={{ marginBottom: 16 }}
      >
        <Field label="Nombre de Usuario" width={193} />
        <Field label="Password" type="password" width={193} />
        <Field label="Configuracion de Password" type="password" width={193} />
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
        <Field label="Ruta" width={447} />
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
        <Field label="Ruta" width={447} />
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
        <Field label="Ruta" width={447} />
      </Stack>

      <Stack direction="row" justifyContent="flex-end" gap="12px">
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained">Guardar</Button>
      </Stack>
    </>
  );
};

const ModalArea = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: any;
}) => {
  const onClose = () => setIsModalOpen(false);
  return (
    <div>
      <Modal
        title="Agregar Area"
        maxWidth={700}
        maxHeight={900}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalAreaContent onClose={onClose} />
      </Modal>
    </div>
  );
};
export default ModalArea;
