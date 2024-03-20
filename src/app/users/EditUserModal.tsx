"use client";
import { useCallback, useState } from "react";
import Dropdrown from "@/components/Dropdown";
import Field from "@/components/Field";
import { Modal } from "@/components/Modal";
import EnhancedTable from "@/components/Table";
import { Button, Stack, Typography } from "@mui/material";

export default function EditUserModal({
  open,
  data: initialValues,
  onClose,
}: {
  open: boolean;
  data: any;
  onClose: any;
}) {
  const [currentState, setCurrentState] = useState(initialValues);

  console.log({ initialValues });

  const onChange = useCallback((key: string, value: any) => {
    setCurrentState((prev: any) => ({ ...prev, key: value }));
  }, []);
  return (
    <Modal
      title="Editar Usuarios"
      maxWidth="700px"
      open={open}
      onClose={onClose}
    >
      <Stack rowGap={"20px"} direction="column" mb="24px">
        <Stack
          columnGap={"20px"}
          direction="row"
          justifyContent="space-between"
        >
          <Field
            label="RUT Usuario"
            disabled
            width={130}
            value={currentState?.dni}
          />
          <Field
            label="Nombre Público"
            disabled
            width={222}
            value={currentState?.publicName}
          />
          <Field
            label="Password"
            type="password"
            disabled
            width={222}
            value={currentState?.password}
          />
        </Stack>
        <Stack
          columnGap={"20px"}
          direction="row"
          justifyContent="space-between"
        >
          <Field label="Email" width={434} value={currentState?.email} />
          <Field
            label="Validez"
            disabled
            width={166}
            value={currentState?.validity}
          />
        </Stack>
      </Stack>
      <Typography variant="subtitle1">Roles de Usuario</Typography>
      <EnhancedTable
        columns={[
          {
            label: "Grupo",
            id: "group",
          },
          {
            label: "Perfil",
            id: "profile",
          },
        ]}
        rows={[
          {
            group: "05 - Administrador Instituciones",
            profile: "05 - Administrador Instituciones",
          },
          {
            group: "03 - Tratador de Mensajes",
            profile: "03 - Tratador Mensajes Tipo 17",
          },
        ]}
      />
      <Typography variant="subtitle1" mb="20px" mt="24px">
        Localidad
      </Typography>
      <Stack columnGap={"20px"} direction="row" justifyContent="space-between">
        <Dropdrown label="Localidad" width={195} options={[]} />
        {/* <Dropdrown label="Localidad" width={195} value={currentState?.location} options={[]} /> */}

        <Dropdrown label="Región" width={195} options={[]} />
        {/* <Dropdrown label="Región" width={195} value={currentState?.areaCode} options={[]} /> */}

        <Dropdrown label="Comuna" width={195} options={[]} />
        {/* <Dropdrown label="Comuna" width={195} value={currentState?.comunne} options={[]} /> */}
      </Stack>
      <Typography variant="subtitle1" mb="20px" mt="24px">
        Institución y Área
      </Typography>
      <Stack columnGap={"20px"} direction="row" justifyContent="space-between">
        <Dropdrown label="Institución" width={301} options={[]} />
        {/* <Dropdrown label="Institución" width={301} value={currentState?.institutionCode} options={[]} /> */}

        <Dropdrown label="Area" width={301} options={[]} />
        {/* <Dropdrown label="Area" width={301} value={currentState?.areaCode} options={[]} /> */}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb="20px"
        mt="24px"
        alignItems="center"
      >
        <Typography variant="subtitle1">Seguridad</Typography>
        <Typography variant="caption">
          Solo Tratador de Mensajes y/o Firma Electronica
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb="20px"
        mt="24px"
        alignItems="center"
      >
        <Typography variant="subtitle2">Nivel TRMS</Typography>
        <Dropdrown label="Seleccionar Nivel" width={166} options={[]} />
        {/* <Dropdrown label="Seleccionar Nivel" width={166} value={currentState?.rut} options={[]} /> */}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb="20px"
        mt="24px"
        alignItems="center"
      >
        <Typography variant="subtitle2">Firma Electrónica</Typography>
        <Stack direction="row" gap="20px">
          <Field
            label="Clase (A-Z)"
            width={183}
            value={currentState?.class}
            onChange={(value: any) => onChange("class", value)}
          />
          {/* <Dropdrown label="Nivel Firma" width={166} value={currentState?.rut} options={[]} /> */}
          <Dropdrown label="Nivel Firma" width={166} options={[]} />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb="20px"
        mt="24px"
        alignItems="center"
      >
        <Typography variant="subtitle2">Password Firma Electrónica</Typography>
        <Stack direction="row" gap="20px">
          <Field label="Password FE" width={183} value={currentState?.rut} />
          <Dropdrown
            label="Confirmación Password FE"
            width={166}
            options={[]}
          />
          {/* <Dropdrown label="Confirmación Password FE" width={166} value={currentState?.rut} options={[]} /> */}
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" gap="12px">
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained">Guardar</Button>
      </Stack>
    </Modal>
  );
}
