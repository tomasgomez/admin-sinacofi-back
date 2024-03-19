import { AreaRepository } from '../../interfaces/areaRepository';
import { PrismaAreaAdapter as PrismaAdapter } from '../../adapters/prisma/area';
import { Area } from '../../entities/area';


export class GetArea {
    constructor(private readonly areaRepository: AreaRepository) {} 
  
    async execute(attributes: Area,  count: string, offset: string ): Promise<Area[] | Error> {
      try {
        const area = await this.areaRepository.find(attributes, count, offset);

        return area;
      } catch (error:any) {
        // Handle errors appropriately
        console.error('Error fetching area:', error);
        return error;
      }
    }
  }


const areaRepository: AreaRepository = new PrismaAdapter();
export const getAreaUseCase = new GetArea(areaRepository); // Add it on the api layer