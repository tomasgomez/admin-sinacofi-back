import {
  UserRepository
} from '../../interfaces/userRepository';

import { User } from '../../entities/user';


export class PrismaUserAdapter implements UserRepository {
  async findById(id: string): Promise < User | null > {
    try {
      console.log('Fetching user...' + id);

      /* Find a user by their ID */
      // const user = await prisma.user.findUnique({ where: { id } }); 

      var user = new User();

      user.id = id;

      return user;
    } catch (error) {

      //TODO: Handle errors appropriately
      console.error('Error fetching user:', error);
      return null;
    }
  }
}