import {
    InstitutionRepository
} from '../../interfaces/institutionRepository';
import {
    PrismaInstitutionAdapter as PrismaAdapter
} from '../../adapters/prisma/institutionDatabase';
import {
    FinanciaInstitution as Institution
} from '../../entities/financialInstitution';


export class UpdateInstitution {
    private repository: InstitutionRepository;

    constructor(repository: InstitutionRepository) {
        this.repository = repository;
    }

    async execute(institutionId: string, institution: Institution): Promise < Institution | Error > {
        try {
            /* Find the Institution by their ID */
            var foundInstitution = await this.repository.findById(institutionId);

            if (foundInstitution instanceof Error) {
                return foundInstitution;
            }

            /* Update the Institution */
            var updatedInstitution = await this.repository.update(institution);

            return updatedInstitution;
        } catch (error: any) {
            console.error('Error updating institution:', error);
            return error;
        }
    }
}


const institutionRepository: InstitutionRepository = new PrismaAdapter();
export const updateInstitutionUseCase = new UpdateInstitution(institutionRepository); 