export const addOption = (array: any, originalData: any) => {
  if (!originalData) return array;
  if (array.some((item: any) => item.label === originalData)) return array;
  return [...array, { value: originalData, label: originalData }];
};

export const generateInstitutionsOptions = (institutions: any) =>
  institutions.map((institution: any) => ({
    value: `${institution.id} - ${institution.name}`,
    label: `${institution.id} - ${institution.name}`,
  }));

export const isFieldDisabled = (conectivityType: string) => {
  if (
    conectivityType === "Browser" ||
    !conectivityType ||
    conectivityType === "-"
  )
    return true;
  return false;
};

export const formatId = (value: string, maxLength?: number) =>
  value.replace(/[^0-9]/g, "").slice(0, maxLength);
