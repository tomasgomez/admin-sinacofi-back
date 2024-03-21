"use client";
import Field from "@/components/Field";
import { Modal } from "@/components/Modal";
import EnhancedTable from "@/components/Table";
import { Button, Stack, Typography } from "@mui/material";

export default function ProfileDetailsModal({ open, data, onClose }: { open: boolean, data: any, onClose: any }) {
  return (
    <Modal title="Detalles del Perfil" maxWidth="700px" open={open} onClose={onClose}>
      <Stack rowGap={"20px"} direction="column" mb="24px">
        <Stack columnGap={"20px"} direction="row" justifyContent="space-between">
          <Field
            label="Grupo"
            disabled
            width={241}
            value={data?.userGroup}
          />
          <Field
            label="Perfil"
            disabled
            width={359}
            value={data?.profile}
          />
        </Stack>
      </Stack>
      <Typography variant="subtitle1" mb="20px">
        Usuarios Asociados al Rol
      </Typography>
      <EnhancedTable
        minWidth="620px"
        columns={[
          {
            label: "RUT",
            id: "dni",
          },
          {
            label: "Nombre",
            id: "userName"
          },
          {
            label: "Institución",
            id: "institution"
          },
          {
            label: "Área",
            id: "area"
          },
        ]}
        rows={data?.associatedUsers || []}
      />
      <Stack direction="row" justifyContent="flex-end" gap="12px">
        <Button variant="contained" onClick={onClose}>
          Cerrar
        </Button>
      </Stack>
    </Modal>
  );
};