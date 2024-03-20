
import { Institution } from '../institution';

export function validateInstitutionCreation(data: any): Institution {
  const errors: string[] = [];
  let institution: Institution;

  let jsonData: Institution | string = typeof data === 'string' ? JSON.parse(data) : data as Institution;

  if (jsonData instanceof String) {
    errors.push('Invalid institution data');
    throw new Error(`Invalid institution data: ${errors.join(', ')}`);
  }

  institution = jsonData as Institution;


  return institution;
}

export function validateInstitutionEdition(id: string, data: any): Institution {
  const errors: string[] = [];
  let institution: Institution;

  let jsonData: Institution | string = typeof data === 'string' ? JSON.parse(data) : data as Institution;

  if (jsonData instanceof String) {
    errors.push('Invalid institution data');
    throw new Error(`Invalid institution data: ${errors.join(', ')}`);
  }

  institution = jsonData as Institution;

  if (!id || typeof id !== 'string' || id.trim() === '') {
    errors.push('Missing required attribute: id');
  }

  const attributesPresent = Object.keys(jsonData).some(attr => ['fullName', 'rut', 'name', 'areaCode'].includes(attr));
  if (!attributesPresent) {
    errors.push('At least one editable attribute must be present');
  }

  if (errors.length > 0) {
    throw new Error(`Invalid institution data: ${errors.join(', ')}`);
  }

  institution.id = id;

  return institution;
}

export function validateInstitutionId(data: any): string | Error {
  const { id } = data;

  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw new Error('Wrong attribute: id');
  }

  return id;
}

export function validateGetInstitution(data: any): [Institution, string, string] | Error {
  let institution: Institution = new Institution();

  const { id, areaCode, count, offset } = data;

  let countResponse: string = '0';
  let offsetResponse: string = '0';

  if (id && typeof id === 'string' && id.trim() !== '') {
    institution.id = id;
  }

  if (areaCode && typeof areaCode === 'string' && areaCode.trim() !== '') {
    institution.areaCode = areaCode;
  }

  if (count && typeof count === 'string' && count.trim() !== '') {
    countResponse = count;
  }

  if (offset && typeof offset === 'string' && offset.trim() !== '') {
    offsetResponse = offset;
  }

  return [institution, countResponse, offsetResponse];
}
