import {
    Area
} from '../../entities/area';

import {
    AreaRepository
} from '../../interfaces/areaRepository';

import {
    PrismaAreaAdapter as PrismaAdapter
} from '../../adapters/prisma/area';

export class DeleteArea {
    private repository: AreaRepository;

    constructor(repository: AreaRepository) {
        this.repository = repository;
    }

    async execute(areaId: string): Promise < Area | Error > {
        try {
            let area = new Area();

            area.id = areaId;

            /* Delete the area */
            var deletedArea = await this.repository.delete(area);

            return deletedArea;
        } catch (error: any) {
            console.error('Error deleting area:', error);
            return error;
        }
    }
}

const areaRepository: AreaRepository = new PrismaAdapter();
export const deleteAreaUseCase = new DeleteArea(areaRepository); // Add it on the api layer