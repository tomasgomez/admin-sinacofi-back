import {
  UserRepository
} from '../interfaces/userRepository';

import {
  User
} from '../entities/user';

import {
  PrismaClientWrapper
} from './client';


export class PrismaUserAdapter implements UserRepository {
  async findById(id: string): Promise < User | Error > {
    try {
      console.log('Fetching user...' + id);

      const prisma = new PrismaClientWrapper().getClient();

      /* Find a user by their ID */
      const user = await prisma.user.findUnique({
        where: {
          id
        }
      });

      return user;
    } catch (error: any) {

      console.error('Error fetching user:', error);
      return error;
    }
  }

  async create(user: User): Promise < User | Error > {
    try {
      console.log('Creating user...');

      const prisma = new PrismaClientWrapper().getClient();

      /* Create a new user */
      const newUser = await prisma.user.create({
        data: user
      });

      return newUser;
    } catch (error: any) {

      console.error('Error creating user:', error);
      return error;
    }
  }

}