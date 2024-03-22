"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Dropdrown from "@/components/Dropdown";
import Field from "@/components/Field";
import EnhancedTable from "@/components/Table";
import { Button, Stack, Typography } from "@mui/material";
import { communeList, locationList, regionList } from "./mock-data";
import { Modal } from "@/components/Modal";
import { getAreas, getInstitutions } from "./services";

async function updateUser(values: any) {
  const response = await fetch(`/api/user?id=${values.dni}`, {
    method: "PUT",
    body: JSON.stringify({ ...values }),
  });

  return response;
}

const signatureLevelOptions = [
  {
    label: "Nivel 0",
    value: "0",
  },
  {
    label: "Nivel 2",
    value: "2",
  },
  {
    label: "Nivel 3",
    value: "3",
  },
  {
    label: "Nivel 4",
    value: "4",
  },
  {
    label: "Nivel 5",
    value: "5",
  },
];

const trmsLevelOptions = [
  {
    label: "Nivel 0",
    value: "0",
  },
  {
    label: "Nivel 2",
    value: "2",
  },
  {
    label: "Nivel 3",
    value: "3",
  },
  {
    label: "Nivel 4",
    value: "4",
  },
  {
    label: "Nivel 5",
    value: "5",
  },
];

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
  const [institutionList, setInstitutionList] = useState<any[]>([]);
  const [areaList, setAreaList] = useState<any[]>([]);
  const [confirmPassword, setConfirmPassword] = useState<any>(initialValues?.passwordElectronicSignature);
  const [isNotValid, setIsNotValid] = useState<boolean>(false);

  const validity = useMemo(() => {
    if (!initialValues?.passwordExpirationDate) {
      return "Indefinido";
    }
    const today = new Date();
    const expiredDate = new Date(initialValues?.passwordExpirationDate);
    const monthValidity = (expiredDate.getMonth() + 1) - (today.getMonth() + 1) + (12 * (expiredDate.getFullYear() - today.getFullYear()));
    return `${monthValidity} ${monthValidity > 1 ? "meses" : "mes"}`;
  }, initialValues);

  const onChange = useCallback((key: string, value: any) => {
    console.log({ [key]: value });
    setCurrentState((prev: any) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    getInstitutions().then((institutions) => {
      setInstitutionList(institutions.map((institution: any) => ({
        value: institution.id,
        label: `${institution.id} - ${institution.name}`
      })));
    });
    getAreas().then((areas) => {
      setAreaList(areas.map((area: any) => ({
        value: area.id,
        label: `${area.id} - ${area.name}`
      })))
    });
  }, []);

  const onSubmit = useCallback(async () => {
    if (currentState?.passwordElectronicSignature !== confirmPassword) {
      return setIsNotValid(true);
    }
    setIsNotValid(false);
    await updateUser(currentState);
    onClose(true);
  }, [currentState, confirmPassword]);

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
          <Field
            label="Email"
            width={434}
            value={currentState?.email}
            onChange={(value: any) => onChange("email", value)}
          />
          <Field
            label="Validez"
            disabled
            width={166}
            value={validity}
          />
        </Stack>
      </Stack>
      <Typography variant="subtitle1" mb="20px">Roles de Usuario</Typography>
      <EnhancedTable
        withPagination={false}
        minWidth="620px"
        columns={[
          {
            label: "Grupo",
            id: "group",
            width: "50%",
          },
          {
            label: "Perfil",
            id: "profile",
            width: "50%",
          },
        ]}
        rows={[
          {
            group: currentState?.userGroup,
            profile: currentState?.userProfile,
          },
        ]}
      />
      <Typography variant="subtitle1" mb="20px" mt="24px">
        Localidad
      </Typography>
      <Stack columnGap={"20px"} direction="row" justifyContent="space-between">
        {/* <Dropdrown label="Localidad" width={195}  /> */}
        <Dropdrown
          label="Localidad"
          width={195}
          selected={currentState?.location}
          options={locationList}
          onChange={(value: any) => onChange("location", value)}
        />
        <Dropdrown
          label="Región"
          width={195}
          selected={currentState?.region}
          options={regionList}
          onChange={(value: any) => onChange("region", value)}
        />
        <Dropdrown
          label="Comuna"
          width={195}
          selected={currentState?.comunne}
          options={communeList}
          onChange={(value: any) => onChange("comunne", value)}
        />
      </Stack>
      <Typography variant="subtitle1" mb="20px" mt="24px">
        Institución y Área
      </Typography>
      <Stack columnGap={"20px"} direction="row" justifyContent="space-between">
        <Dropdrown
          label="Institución"
          width={301}
          selected={currentState?.institutionCode}
          options={institutionList}
          onChange={(value: any) => onChange("institutionCode", value)}
        />
        <Dropdrown
          label="Área"
          width={301}
          selected={currentState?.areaCode}
          options={areaList}
          onChange={(value: any) => onChange("areaCode", value)}
        />
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
        <Dropdrown
          label="Seleccionar Nivel"
          width={183}
          selected={currentState?.userMessageLevel}
          options={trmsLevelOptions}
          onChange={(value: any) => onChange("userMessageLevel", value)}
          />
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
            value={currentState?.signatureClass}
            onChange={(value: any) => onChange("signatureClass", value)}
          />
          <Dropdrown
            label="Nivel Firma"
            selected={currentState?.signatureLevel}
            width={183}
            options={signatureLevelOptions}
            onChange={(value: any) => onChange("signatureLevel", value)}
          />
        </Stack>
      </Stack>
      {/* Not sure if this functionality go to production */}
      {/* <Stack
        direction="row"
        justifyContent="space-between"
        mb="20px"
        mt="24px"
        alignItems="center"
      >
        <Typography variant="subtitle2">Password Firma Electrónica</Typography>
        <Stack direction="row" gap="20px">
          <Field
            label="Password FE"
            type="password"
            width={183}
            value={currentState?.passwordElectronicSignature}
            onChange={(value: any) => onChange("passwordElectronicSignature", value)}
          />
          <Field
            label="Confirmación Password FE"
            width={183}
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </Stack>
      </Stack>
      {isNotValid && (
        <Stack
          direction="row"
          justifyContent="center"
          mb="10px"
          alignItems="center"
        >
          <Typography variant="caption" sx={{ color: "red" }}>
            Password FE && Confirmación Password FE tienes
          </Typography>
        </Stack>
      )} */}
      <Stack direction="row" justifyContent="flex-end" gap="12px">
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Guardar
        </Button>
      </Stack>
    </Modal>
  );
}
