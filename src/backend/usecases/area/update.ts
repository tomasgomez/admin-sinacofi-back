import {
    AreaRepository
} from '../../interfaces/areaRepository';
import {
    PrismaAreaAdapter as PrismaAdapter
} from '../../adapters/prisma/areaDatabase';
import {
    Area
} from '../../entities/area';


export class UpdateArea {
    private repository: AreaRepository;

    constructor(repository: AreaRepository) {
        this.repository = repository;
    }

    async execute(areaId: string, area: Area): Promise < Area | Error > {
        try {
            /* Find the Area by their ID */
            var foundArea = await this.repository.findById(areaId);

            if (foundArea instanceof Error) {
                return foundArea;
            }

            /* Update the Area */
            var updatedArea = await this.repository.update(area);

            return updatedArea;
        } catch (error: any) {
            console.error('Error updating area:', error);
            return error;
        }
    }
}


const areaRepository: AreaRepository = new PrismaAdapter();
export const updateAreaUseCase = new UpdateArea(areaRepository); 