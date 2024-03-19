import {
  InstitutionRepository
} from '../../interfaces/institutionRepository';
import {
  PrismaInstitutionAdapter as PrismaAdapter
} from '../../adapters/prisma/institution';
import { Institution
} from '../../entities/institution';


export class GetInstitution {
  constructor(private readonly institutionRepository: InstitutionRepository) {}

  async execute(attributes: Institution, count: string, offset: string): Promise < Institution[] | Error > {
    try {
      const institutions = await this.institutionRepository.find(attributes, count, offset);

      return institutions;
    } catch (error: any) {
      // Handle errors appropriately
      console.error('Error fetching institution:', error);
      return error;
    }
  }
}


const institutionRepository: InstitutionRepository = new PrismaAdapter();
export const getInstitutionUsecase = new GetInstitution(institutionRepository); // Add it on the api layer