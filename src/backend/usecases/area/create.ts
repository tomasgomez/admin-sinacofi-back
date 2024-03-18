import { AreaRepository } from '../../interfaces/areaRepository';
import { PrismaAreaAdapter as PrismaAdapter } from '../../adapters/prisma/areaDatabase';
import { Area } from '../../entities/area';


export class CreateArea {
    constructor(private readonly areaRepository: AreaRepository) {} 
  
    async execute(area: Area): Promise<Area | Error> {
      try {
        const response = await this.areaRepository.create(area);

        if (response instanceof Error) {
          throw response;
        }

        return response
      } catch (error:any) {

        console.error('Error creating area:', error);
        return error;
      }
    }
  }


const areaRepository: AreaRepository = new PrismaAdapter();
export const createAreaUseCase = new CreateArea(areaRepository); 