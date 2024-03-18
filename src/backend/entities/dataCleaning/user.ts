import {
  User,
  validEditableData
} from '../user';

export function validateUserEdition(id: string, data: any): User {
  const errors: string[] = []; // Array to store validation errors
  let user: User;

  // Type assertion 
  let jsonData: User | string = typeof data === 'string' ? JSON.parse(data) : data as User; // Assert as User type

  // Checking if jsonData is of type User
  if (jsonData instanceof String) {
    errors.push('Invalid user data');
    throw new Error(`Invalid user data: ${errors.join(', ')}`); // Combine errors in message
  }

  user = jsonData as User;

  if (!id || typeof id !== 'string' || id.trim() === '') {
    errors.push('Missing required attribute: id');
  }

  // Validating at least one editable attribute
  const attributesPresent = Object.keys(jsonData).some(attr => validEditableData.includes(attr));
  if (!attributesPresent) {
    errors.push('At least one editable attribute must be present');
  }

  if (errors.length > 0) {
    throw new Error(`Invalid user data: ${errors.join(', ')}`); // Combine errors in message
  }


  user.dni = id;

  return user;
}

export function validateUserId(data: any): string {
  const {
    id
  } = data;

  // Check for empty or missing ID
  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw new Error('Wrong attribute: id');
  }

  return id;
}
