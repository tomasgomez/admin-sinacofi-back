import {
    Area
} from '../entities/area';

export interface AreaRepository {
    findById(id: string): Promise<Area | Error>;
    create(area: Area): Promise<Area | Error>;
    update(area: Area): Promise<Area | Error>;
}