import { User } from '../../entities/user';

export function validateUser(data: any): User {
    // Type assertion (optional, if you're sure data is an object)
    const jsonData = typeof data === 'string' ? JSON.parse(data) : data as User;  // Assert as User type (optional)
  
    const errors: string[] = [];  // Array to store validation errors
  
    if (!jsonData.id) {
      errors.push('Missing required attribute: id');
    }
  
    if (!jsonData.name) {
      errors.push('Missing required attribute: name');
    }
  
    if (!jsonData.email || !validateEmail(jsonData.email)) {  // Add email validation
      errors.push('Invalid or missing email address');
    }
  
    if (errors.length > 0) {
      throw new Error(`Invalid user data: ${errors.join(', ')}`);  // Combine errors in message
    }

    var user = new User();

    user.id = jsonData.id;
    user.email = jsonData.email;
  
    return user;
  }
  
  // Optional email validation function (you can implement your desired logic)
  function validateEmail(email: string): boolean {
    // Implement email address validation logic (e.g., regular expression)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

export function validateUserId(data: any): string {
    const { id } = data;

    // Check for empty or missing ID
  if (!id || typeof id !== 'string' || id.trim() === '') {
        throw new Error('Wrong attribute: id');
    }

    return id;
}