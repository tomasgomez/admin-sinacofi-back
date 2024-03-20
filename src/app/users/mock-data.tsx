import { Data } from "@/components/Table/type";

export const mockData: Data[] = [
  {
    dni: "40.027.012-12",
    publicName: "Juan Rodriguez",
    email: "Juan.Rodriguez@sinacofi.com",
    password: "123456789",
    validity: "Indefinido",
    userGroup: "03 - Tratador de Mensajes",
    institution: "0020 - Banco Itaú",
    area: "05",
    status: 3,
    actions: "test1",
  },
  {
    dni: "40.027.012-12",
    publicName: "Roberto Diaz",
    email: "Roberto.Diaz@sinacofi.com",
    password: "123456789",
    validity: "Indefinido",
    userGroup: "05 - Administrador Instituciones, 03 - Tratador de Mensajes",
    institution: "0020 - Banco Itaú",
    area: "05",
    status: 1,
    actions: "test2",
  },
  {
    dni: "23.482.223-1",
    publicName: "Federico Jimenez",
    email: "Federico.Jimenez@sinacofi.com",
    password: "123456789",
    validity: "Indefinido",
    userGroup: "05 - Administrador Instituciones",
    institution: "string",
    area: "05",
    status: 3,
    actions: "test3",
  },
  {
    dni: "34.482.232-5",
    publicName: "Felipe Cardenas",
    email: "Felipe.Cardenas@sinacofi.com",
    password: "123456789",
    validity: "Indefinido",
    userGroup: "05 - Administrador Instituciones",
    institution: "0020 - Banco Itaú",
    area: "05",
    status: 3,
    actions: "test4",
  },
  {
    dni: "21.234.223-4",
    publicName: "Julia Perez",
    email: "Julia.Perez@sinacofi.com",
    password: "123456789",
    validity: "Indefinido",
    userGroup: "07 - Todas RIH",
    institution: "0032 - HSBC",
    area: "05",
    status: 3,
    actions: "test5",
  },
  {
    dni: "26.432.223-3",
    publicName: "Laura Lopez",
    email: "Laura.Lopez@sinacofi.com",
    password: "123456789",
    validity: "Indefinido",
    userGroup: "03 - Tratador de Mensajes",
    institution: "0017 - Falabella",
    area: "05",
    status: 3,
    actions: "test6",
  },
  {
    dni: "12.537.223-5",
    publicName: "Ramiro Montaner",
    email: "Ramiro.Montaner@sinacofi.com",
    password: "123456789",
    validity: "Indefinido",
    userGroup: "03 - Tratador de Mensajes",
    institution: "0022 - JP Morgan",
    area: "05",
    status: 3,
    actions: "test7",
  },
  {
    dni: "27.632.223-4",
    publicName: "Monica Smith",
    email: "Monica.Smith@sinacofi.com",
    password: "123456789",
    validity: "Indefinido",
    userGroup: "03 - Tratador de Mensajes",
    institution: "0022 - JP Morgan",
    area: "05",
    status: 3,
    actions: "test8",
  },
];

export const locationList = [
  {
    value: "0320",
    label: "0320 - SANTIAGO",
  },
  {
    value: "0324",
    label: "0324 - COLINA",
  },
  {
    value: "0328",
    label: "0328 - MAIPÚ",
  },
  {
    value: "0330",
    label: "0330 - ALGARROBO",
  },
  {
    value: "0332",
    label: "0332 - EL QUISCO",
  },
  {
    value: "0333",
    label: "0333 - EL TABO",
  },
];

export const regionList = [
  {
    value: "0320",
    label: "Región de Arica y Parinacota",
  },
  {
    value: "0324",
    label: "Región de Tarapacá",
  },
  {
    value: "0328",
    label: "Región de Antofagasta",
  },
  {
    value: "0330",
    label: "Región de Atacama",
  },
  {
    value: "0332",
    label: "Región de Coquimbo",
  },
  {
    value: "0333",
    label: "Región de Valparaíso",
  },
  {
    value: "0334",
    label: "Región Metropolitana",
  },
  {
    value: "0335",
    label: "Región de O’Higgins",
  },
];

export const communeList = [
  {
    value: "0320",
    label: "Región de Arica y Parinacota",
  },
  {
    value: "0324",
    label: "Región de Tarapacá",
  },
  {
    value: "0328",
    label: "Región de Antofagasta",
  },
  {
    value: "0330",
    label: "Región de Atacama",
  },
  {
    value: "0332",
    label: "Región de Coquimbo",
  },
  {
    value: "0333",
    label: "Región de Valparaíso",
  },
  {
    value: "0334",
    label: "Región Metropolitana",
  },
  {
    value: "0335",
    label: "Región de O’Higgins",
  },
];

export const institutionList = [
  {
    label: "Todas",
    value: "all",
  },
  {
    label: "039 - Banco Itaú",
    value: "039",
  },
  {
    label: "031 - HSBC",
    value: "031",
  },
  {
    label: "016 - BCI",
    value: "016",
  },
  {
    label: "041 - JP Morgan",
    value: "041",
  },
  {
    label: "049 - Security",
    value: "049",
  },
];

export const areaList = [
  {
    label: "Todas",
    value: "all",
  },
  {
    label: "05 - Operación TID ",
    value: "05",
  },
  {
    label: "10 - TESORERIA INTEGRAL",
    value: "10",
  },
  {
    label: "12 - CONTABILIDAD",
    value: "12",
  },
  {
    label: "15 -  PASIVOS",
    value: "15",
  },
  {
    label: "20 - TARJETAS BANCARIAS",
    value: "20",
  },
];