import { AreaRepository } from '../../interfaces/areaRepository';
import { PrismaAreaAdapter as PrismaAdapter } from '../../adapters/prisma/areaDatabase';
import { Area } from '../../entities/area';


export class GetArea {
    constructor(private readonly areaRepository: AreaRepository) {} 
  
    async execute(areaId: string): Promise<Area | Error> {
      try {
        const area = await this.areaRepository.findById(areaId);

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