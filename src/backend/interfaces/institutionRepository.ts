import {
    Institution
} from '../entities/institution';

export interface InstitutionRepository {
    find(institution: Institution,count: string, offset: string): Promise<Institution[] | Error>;
    create(institution: Institution): Promise<Institution | Error>;
    update(institution: Institution): Promise<Institution | Error>;
    delete(institution: Institution): Promise<Institution | Error>;
}