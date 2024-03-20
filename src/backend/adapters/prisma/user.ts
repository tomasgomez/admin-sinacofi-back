import {
  UserRepository
} from '../../interfaces/userRepository';

import {
  User
} from '../../entities/user';

import {
  PrismaClientWrapper
} from './client/prismaWrapper';


export class PrismaUserAdapter implements UserRepository {
  async find(attributes: User, count: string, offset: string): Promise < User[] | Error > {
    try {

      let users: User[];

      const prisma = new PrismaClientWrapper();

      const prismaClient = prisma.getClient();

      /* Destructure the attributes from User entity */
      const {
        dni,
        areaCode,
        institutionCode
      } = attributes;

      /* Initialize the where object with the possible attributes to search with */
      const where: {
        dni ? : string;
        areaCode ? : string;
        institutionCode ? : string;
      } = {};



      /* If the attributes are present, add them to the where object */
      if (dni) where.dni = dni;
      if (areaCode) where.areaCode = areaCode;
      if (institutionCode) where.institutionCode = institutionCode;

      /* If count is not present then find all users */
      if (count === '0' || count === '') {
        /* Fetch users based on the constructed where object */
        users = await prismaClient.user.findMany({
          where
        });
      } else {
        users = await prismaClient.user.findMany({
          where,
          take: parseInt(count),
          skip: parseInt(offset)
        });
      }


      /* If the user is not found, return an error */
      if (users.length === 0) {
        return new Error('User not found');
      }

      return users;

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

      const prisma = new PrismaClientWrapper().getClient();

      // Filter out empty values from the user object
      const dataToUpdate = Object.fromEntries(
        Object.entries(user).filter(([_, value]) => value !== '')
      );

      /* Update the user */
      const updatedUser = await prisma.user.update({
        where: {
          dni: user.dni
        },
        data: dataToUpdate
      });

      return updatedUser;
    } catch (error: any) {

      console.error('Error updating user:', error);
      return error;
    }
  }

  async delete(user: User): Promise < User | Error > {
    try {

      const prisma = new PrismaClientWrapper().getClient();

      /* Delete the user */
      const deletedUser = await prisma.user.delete({
        where: {
          dni: user.dni
        }
      });

      return deletedUser;
    } catch (error: any) {

      console.error('Error deleting user:', error);
      return error;
    }
  }
}