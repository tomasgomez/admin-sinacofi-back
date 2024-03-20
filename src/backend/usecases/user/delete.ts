import {
    UserRepository
} from '../../interfaces/userRepository';
import {
    PrismaUserAdapter as PrismaAdapter
} from '../../adapters/prisma/user';
import {
    User
} from '../../entities/user';

export class DeleteUser {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async execute(userId: string): Promise < User | Error > {
        try {
            let user = new User();

            user.dni = userId;

            /* Delete the user */
            var deletedUser = await this.repository.delete(user);

            return deletedUser;
        } catch (error: any) {
            console.error('Error deleting user:', error);
            return error;
        }
    }
}

const userRepository: UserRepository = new PrismaAdapter();
export const deleteUserUseCase = new DeleteUser(userRepository); // Add it on the api layer