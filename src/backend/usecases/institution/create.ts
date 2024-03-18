import { InstitutionRepository } from '../../interfaces/institutionRepository';
import { PrismaInstitutionAdapter as PrismaAdapter } from '../../adapters/prisma/institutionDatabase';
import { FinanciaInstitution as Institution } from '../../entities/financialInstitution';


export class CreateInstitution {
    constructor(private readonly institutionRepository: InstitutionRepository) {} 
  
    async execute(institution: Institution): Promise<Institution | Error> {
      try {
        const response = await this.institutionRepository.create(institution);

        if (response instanceof Error) {
          throw response;
        }

        return response
      } catch (error:any) {

        console.error('Error creating institution:', error);
        return error;
      }
    }
  }


const institutionRepository: InstitutionRepository = new PrismaAdapter();
export const createInstitutionUseCase = new CreateInstitution(institutionRepository); 