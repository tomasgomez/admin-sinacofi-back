
import { User } from "../entities/user";

export interface UserRepository {
    findById(id: string): Promise<User | Error>;
    create(user: User): Promise<User | Error>;
    update(user: User): Promise<User | Error>;
  }
  