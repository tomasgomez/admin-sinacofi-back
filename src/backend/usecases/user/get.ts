import { UserRepository } from '../../interfaces/userRepository';
import { PrismaUserAdapter as PrismaAdapter } from '../../adapters/prisma/userDatabase';
import { User } from '../../entities/user';


export class GetUser {
    constructor(private readonly userRepository: UserRepository) {} 
  
    async execute(userId: string): Promise<User | Error> {
      try {
        const user = await this.userRepository.findById(userId);

        return user;
      } catch (error:any) {
        // Handle errors appropriately
        console.error('Error fetching user:', error);
        return error;
      }
    }
  }


const userRepository: UserRepository = new PrismaAdapter();
export const getUserUseCase = new GetUser(userRepository); // Add it on the api layer