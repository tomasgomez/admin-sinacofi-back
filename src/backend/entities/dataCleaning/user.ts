import { User } from '../user';

export function validateUser(data: any): User {
    // Type assertion (optional, if you're sure data is an object)
    const jsonData = typeof data === 'string' ? JSON.parse(data) : data as User;  // Assert as User type (optional)
  
    const errors: string[] = [];  // Array to store validation errors
  
    if (!jsonData.id) {
      errors.push('Missing required attribute: id');
    }
    
    if (errors.length > 0) {
      throw new Error(`Invalid user data: ${errors.join(', ')}`);  // Combine errors in message
    }

    var user = new User();

    user.id = jsonData.id;
  
    return user;
  }

export function validateUserId(data: any): string {
    const { id } = data;

    // Check for empty or missing ID
  if (!id || typeof id !== 'string' || id.trim() === '') {
        throw new Error('Wrong attribute: id');
    }

    return id;
}