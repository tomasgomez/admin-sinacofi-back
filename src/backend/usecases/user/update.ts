import {
    UserRepository
} from '../../interfaces/userRepository';
import {
    PrismaUserAdapter as PrismaAdapter
} from '../../adapters/prisma/user';
import {
    User
} from '../../entities/user';


export class UpdateUser {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async execute(userId: string, user: User): Promise < User | Error > {
        try {
            let userGet = new User();

            userGet.dni = userId;

            /* Find the user by their ID */
            var foundUser = await this.repository.find(userGet, '0', '0');

            if (foundUser instanceof Error) {
                return foundUser;
            }

            /* Update the user */
            var updatedUser = await this.repository.update(user);

            return updatedUser;
        } catch (error: any) {
            console.error('Error updating user:', error);
            return error;
        }
    }
}

const userRepository: UserRepository = new PrismaAdapter();
export const updateUserUseCase = new UpdateUser(userRepository); 