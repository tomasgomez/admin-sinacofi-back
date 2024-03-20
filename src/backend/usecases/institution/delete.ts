import {
    Institution
} from '../../entities/institution';

import {
    InstitutionRepository
} from '../../interfaces/institutionRepository';

import {
    PrismaInstitutionAdapter as PrismaAdapter
} from '../../adapters/prisma/institution';

export class DeleteInstitution {
    private repository: InstitutionRepository;

    constructor(repository: InstitutionRepository) {
        this.repository = repository;
    }

    async execute(institutionId: string): Promise < Institution | Error > {
        try {
            let institution = new Institution();

            institution.id = institutionId;

            /* Delete the institution */
            var deletedInstitution = await this.repository.delete(institution);

            return deletedInstitution;
        } catch (error: any) {
            console.error('Error deleting institution:', error);
            return error;
        }
    }
}

const institutionRepository: InstitutionRepository = new PrismaAdapter();
export const deleteInstitutionUseCase = new DeleteInstitution(institutionRepository); // Add it on the api layer