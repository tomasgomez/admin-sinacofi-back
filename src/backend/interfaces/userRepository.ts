
import { User } from "../entities/user";

export interface UserRepository {
    find(attributes: User, count: string, offset: string): Promise<User[] | Error>;
    create(user: User): Promise<User | Error>;
    update(user: User): Promise<User | Error>;
    delete(user: User): Promise<User | Error>;
  }
  