import {
  AreaRepository
} from '../../interfaces/areaRepository';

import {
  Area
} from '../../entities/area';

import {
  PrismaClientWrapper
} from './prismaWrapper';


export class PrismaAreaAdapter implements AreaRepository {
  async findById(id: string): Promise < Area | Error > {
    try {
      console.log('Fetching area...' + id);

      const prisma = new PrismaClientWrapper();

      const prismaClient = prisma.getClient();

      /* Find a area by their ID */
      const area = await prismaClient.area.findUnique({
        where: {
          id: id
        }
      });

      if (area === null) {
        throw new Error('Area not found');
      }

      return area;
    } catch (error: any) {

      console.error('Error fetching area:', error);
      return error;
    }
  }

  async create(area: Area): Promise < Area | Error > {
    try {
      console.log('Creating area...');

      const prisma = new PrismaClientWrapper().getClient();

      /* Create a new area */
      const newArea = await prisma.area.create({
        data: area
      });

      return newArea
    } catch (error: any) {

      console.error('Error creating area:', error);
      return error;
    }
  }

  async update(area: Area): Promise < Area | Error > {
    try {
      console.log('Updating area...');

      const prisma = new PrismaClientWrapper().getClient();

      /* Update the area */
      const updatedArea = await prisma.area.update({
        where: {
          id: area.id
        },
        data: area
      });

      return updatedArea;
    } catch (error: any) {

      console.error('Error updating area:', error);
      return error;
    }
  }

}