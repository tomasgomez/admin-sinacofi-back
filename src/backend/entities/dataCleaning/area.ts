import { Area } from '../area';

export function validateAreaEdition(id: string, data: any): Area {
  const errors: string[] = [];
  let area: Area;

  let jsonData: Area | string = typeof data === 'string' ? JSON.parse(data) : data as Area;

  if (jsonData instanceof String) {
    errors.push('Invalid area data');
    throw new Error(`Invalid area data: ${errors.join(', ')}`);
  }

  area = jsonData as Area;

  if (!id || typeof id !== 'string' || id.trim() === '') {
    errors.push('Missing required attribute: id');
  }

  const attributesPresent = Object.keys(jsonData).some(attr => ['name', 'description', 'distributionPath', 'pathPams', 'pathSams', 'ftiiCode', 'conectivityType', 'institutionCode', 'isActive'].includes(attr));
  if (!attributesPresent) {
    errors.push('At least one editable attribute must be present');
  }

  if (errors.length > 0) {
    throw new Error(`Invalid area data: ${errors.join(', ')}`);
  }

  area.id = id;

  return area;
}

export function validateAreaId(data: any): string | Error {
  const { id } = data;

  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw new Error('Wrong attribute: id');
  }

  return id;
}

export function validateGetArea(data: any): [Area, string, string] | Error {
  let area: Area = new Area();

  const { id, institutionCode, count, offset } = data;

  let countResponse: string = '0';
  let offsetResponse: string = '0';

  if (id && typeof id === 'string' && id.trim() !== '') {
    area.id = id;
  }

  if (institutionCode && typeof institutionCode === 'string' && institutionCode.trim() !== '') {
    area.institutionCode = institutionCode;
  }

  if (count && typeof count === 'string' && count.trim() !== '') {
    countResponse = count;
  }

  if (offset && typeof offset === 'string' && offset.trim() !== '') {
    offsetResponse = offset;
  }

  return [area, countResponse, offsetResponse];
}
