import {
  InstitutionRepository
} from '../../interfaces/institutionRepository';

import {
 Institution
} from '../../entities/institution';

import {
  PrismaClientWrapper
} from './client/prismaWrapper';


export class PrismaInstitutionAdapter implements InstitutionRepository {
  async find(attributes: Institution, count: string, offset: string): Promise < Institution[] | Error > {
    try {
      console.log('Fetching institutions...');

      let institutions: Institution[];

      const prisma = new PrismaClientWrapper();

      const prismaClient = prisma.getClient();

      /* Destructure the attributes from User entity */
      const {
        id,
        areaCode,
      } = attributes;

      /* Initialize the where object with the possible attributes to search with */
      const where: {
        id ? : string;
        areaCode ? : string;
      } = {};

      /* If the attributes are present, add them to the where object */
      if (id) where.id = id;
      if (areaCode) where.areaCode = areaCode;

      /* If count is not present then find all users */
      if (count === '0' || count === '') {
        /* Fetch users based on the constructed where object */
        institutions = await prismaClient.institution.findMany({
          where
        });
      } else {
        institutions = await prismaClient.institution.findMany({
          where,
          take: parseInt(count),
          skip: parseInt(offset)
        });
      }

      /* If the institution is not found, return an error */
      if (institutions.length === 0) {
        return new Error('Institution not found');
      }


      return institutions;
    } catch (error: any) {

      console.error('Error fetching institution:', error);
      return error;
    }
  }

  async create(institution: Institution): Promise < Institution | Error > {
    try {
      console.log('Creating institution...');

      const prisma = new PrismaClientWrapper().getClient();

      /* Create a new institution */
      const newInstitution = await prisma.institution.create({
        data: institution
      });

      return newInstitution
    } catch (error: any) {

      console.error('Error creating institution:', error);
      return error;
    }
  }

  async update(institution: Institution): Promise < Institution | Error > {
    try {
      console.log('Updating institution...');

      const prisma = new PrismaClientWrapper().getClient();

      /* Update the institution */
      const updatedInstitution = await prisma.institution.update({
        where: {
          id: institution.id
        },
        data: institution
      });

      return updatedInstitution;
    } catch (error: any) {

      console.error('Error updating institution:', error);
      return error;
    }
  }

  async delete(institution: Institution): Promise < Institution | Error > {
    try {
      console.log('Deleting institution...');

      const prisma = new PrismaClientWrapper().getClient();

      /* Delete the institution */
      const deletedInstitution = await prisma.institution.delete({
        where: {
          id: institution.id
        }
      });

      return deletedInstitution;
    } catch (error: any) {

      console.error('Error deleting institution:', error);
      return error;
    }
  }

}