export const getInstitutions = async () => {
  return fetch('/api/institution')
    .then((response) => response.json());
};
export const getAreas = async () => {
  return fetch('/api/area')
    .then((response) => response.json());
};