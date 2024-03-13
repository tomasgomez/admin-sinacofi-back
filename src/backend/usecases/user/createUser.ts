import { UserRepository } from '../../interfaces/userRepository';
import { PrismaUserAdapter as PrismaAdapter } from '../../adapters/prisma/userDatabase';
import { User } from '../../entities/user';


export class CreateUser {
    constructor(private readonly userRepository: UserRepository) {} 
  
    async execute(user: User): Promise<User | Error> {
      try {
        const response = await this.userRepository.create(user);

        if (response instanceof Error) {
          throw response;
        }

        return response
      } catch (error:any) {

        console.error('Error creating user:', error);
        return error;
      }
    }
  }


const userRepository: UserRepository = new PrismaAdapter();
const createUserUseCase = new CreateUser(userRepository); 