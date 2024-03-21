export const getInstitutions = async () => {
  return fetch("/api/institution").then((response) => response.json());
};
