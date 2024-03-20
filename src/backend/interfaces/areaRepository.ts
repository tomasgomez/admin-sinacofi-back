import {
    Area
} from '../entities/area';

export interface AreaRepository {
    find(area: Area, count: string, offset: string): Promise<Area[] | Error>;
    create(area: Area): Promise<Area | Error>;
    update(area: Area): Promise<Area | Error>;
    delete(area: Area): Promise<Area | Error>;
}