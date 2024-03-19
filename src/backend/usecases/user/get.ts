import { UserRepository } from '../../interfaces/userRepository';
import { PrismaUserAdapter as PrismaAdapter } from '../../adapters/prisma/userDatabase';
import { User } from '../../entities/user';


export class GetUser {
    constructor(private readonly userRepository: UserRepository) {} 
  
    async execute(attributes: User, count:string, offset:string ): Promise<User[] | Error> {
      try {
        const user = await this.userRepository.find(attributes, count, offset);

        return user;
      } catch (error:any) {
        console.error('Error fetching user:', error);
        return error;
      }
    }
  }


const userRepository: UserRepository = new PrismaAdapter();
export const getUserUseCase = new GetUser(userRepository); // Add it on the api layer