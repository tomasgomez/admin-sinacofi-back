import {
  UserRepository
} from '../../interfaces/userRepository';

import {
  User
} from '../../entities/user';

import {
  PrismaClientWrapper
} from './prismaWrapper';


export class PrismaUserAdapter implements UserRepository {
  async findById(id: string): Promise < User | Error > {
    try {
      console.log('Fetching user...' + id);

      const prisma = new PrismaClientWrapper();

      const prismaClient = prisma.getClient();

      /* Find a user by their ID */
      const user = await prismaClient.user.findUnique({
        where: {
          dni: id
        }
      });

      if (user === null) {
        throw new Error('User not found');
      }

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

  async update(user: User): Promise < User | Error > {
    try {
      console.log('Updating user...');

      const prisma = new PrismaClientWrapper().getClient();

      /* Update the user */
      const updatedUser = await prisma.user.update({
        where: {
          dni: user.dni
        },
        data: user
      });

      return updatedUser;
    } catch (error: any) {

      console.error('Error updating user:', error);
      return error;
    }
  }

}