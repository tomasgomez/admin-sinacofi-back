import {
    FinanciaInstitution as Institution
} from '../entities/financialInstitution';

export interface InstitutionRepository {
    findById(id: string): Promise<Institution | Error>;
    create(institution: Institution): Promise<Institution | Error>;
    update(institution: Institution): Promise<Institution | Error>;
}