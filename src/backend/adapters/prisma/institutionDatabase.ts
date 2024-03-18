import {
  InstitutionRepository
} from '../../interfaces/institutionRepository';

import {
  FinanciaInstitution as Institution
} from '../../entities/financialInstitution';

import {
  PrismaClientWrapper
} from './prismaWrapper';


export class PrismaInstitutionAdapter implements InstitutionRepository {
  async findById(id: string): Promise < Institution | Error > {
    try {
      console.log('Fetching institution...' + id);

      const prisma = new PrismaClientWrapper();

      const prismaClient = prisma.getClient();

      /* Find a institution by their ID */
      const institution = await prismaClient.institution.findUnique({
        where: {
          id: id
        }
      });

      if (institution === null) {
        throw new Error('Institution not found');
      }

      return institution;
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

}