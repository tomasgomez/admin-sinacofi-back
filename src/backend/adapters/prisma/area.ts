import {
  AreaRepository
} from '../../interfaces/areaRepository';

import {
  Area
} from '../../entities/area';

import {
  PrismaClientWrapper
} from './client/prismaWrapper';


export class PrismaAreaAdapter implements AreaRepository {
  async find(attributes: Area, count: string, offset: string): Promise < Area[] | Error > {
    try {

      let areas: Area[];

      const prisma = new PrismaClientWrapper();

      const prismaClient = prisma.getClient();

      /* Desctructure the attributes from Area entity */
      const {
        id,
        institutionCode,
      } = attributes;

      /* Initialize the where object with the possible attributes to search with */
      const where: {
        id ? : string;
        institutionCode ? : string;
      } = {};

      /* If the attributes are present, add them to the where object */
      if (id) where.id = id;
      if (institutionCode) where.institutionCode = institutionCode;

      /* If count is not present then find all areas */
      if (count === '0' || count === '') {
        /* Fetch areas based on the constructed where object */
        areas = await prismaClient.area.findMany({
          where
        });
      } else {
        areas = await prismaClient.area.findMany({
          where,
          take: parseInt(count),
          skip: parseInt(offset)
        });
      }

      /* If the area is not found, return an error */
      if (areas.length === 0) {
        return new Error('Area not found');
      }

      return areas;
    } catch (error: any) {

      console.error('Error fetching area:', error);
      return error;
    }
  }

  async create(area: Area): Promise < Area | Error > {
    try {
      console.log('Creating area...');

      const prisma = new PrismaClientWrapper().getClient();

      /* Empty area object */
      let areaData: Area = new Area();

      /* If id is provided, include it in the areaData */
      if (area.id !== undefined && area.id !== null) {
        areaData.id = area.id;
      }

      /* Include other attributes if they are provided */
      if (Object.keys(area).length > 1) {
        areaData = {
          ...areaData,
          ...area
        };
      }

      /* Create a new area */
      const newArea = await prisma.area.create({
        data: areaData
      });

      return newArea
    } catch (error: any) {

      console.error('Error creating area:', error);
      return error;
    }
  }

  async update(area: Area): Promise < Area | Error > {
    try {

      const prisma = new PrismaClientWrapper().getClient();

      // Filter out empty values from the area object
      const dataToUpdate = Object.fromEntries(
        Object.entries(area).filter(([_, value]) => value !== '')
      );

      /* Update the area */
      const updatedArea = await prisma.area.update({
        where: {
          id: area.id
        },
        data: dataToUpdate
      });

      return updatedArea;
    } catch (error: any) {

      console.error('Error updating area:', error);
      return error;
    }
  }

  async delete(area: Area): Promise < Area | Error > {
    try {

      const prisma = new PrismaClientWrapper().getClient();

      /* Delete the area */
      const deletedArea = await prisma.area.delete({
        where: {
          id: area.id
        }
      });

      return deletedArea;
    } catch (error: any) {

      console.error('Error deleting area:', error);
      return error;
    }
  }

}