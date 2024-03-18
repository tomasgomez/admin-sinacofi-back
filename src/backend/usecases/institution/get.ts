import { InstitutionRepository } from '../../interfaces/institutionRepository';
import { PrismaInstitutionAdapter as PrismaAdapter } from '../../adapters/prisma/institutionDatabase';
import { FinanciaInstitution as Institution } from '../../entities/financialInstitution';


export class GetInstitution {
    constructor(private readonly institutionRepository: InstitutionRepository) {} 
  
    async execute(institutionId: string): Promise<Institution | Error> {
      try {
        const institution = await this.institutionRepository.findById(institutionId);

        return institution;
      } catch (error:any) {
        // Handle errors appropriately
        console.error('Error fetching institution:', error);
        return error;
      }
    }
  }


const institutionRepository: InstitutionRepository = new PrismaAdapter();
export const getInstitutionUsecase = new GetInstitution(institutionRepository); // Add it on the api layer