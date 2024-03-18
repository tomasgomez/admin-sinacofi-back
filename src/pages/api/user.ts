import {
  getUserUseCase
  
} from '@/backend/usecases/user/get';

import {
  NextApiRequest,
  NextApiResponse
} from 'next';

import {
  validateUserId,
  validateUserEdition
} from '../../backend/entities/dataCleaning/user';

import {
  Methods
} from '../../backend/entities/http';

import {
  User
} from '../../backend/entities/user';
import { updateUserUseCase } from '@/backend/usecases/user/update';

export default async function handler(req: NextApiRequest, res: NextApiResponse < User | Error > ) {
  const method = req.method;

  switch (method) {
    case Methods.GET:
      try {
        console.log('Fetching user...');

        /* Validate the query params and get the userId */
        var userId = validateUserId(req.query);

        if (userId instanceof Error) {
          res.status(400).json(userId);
          return;
        }

        /* Use the PrismaUserAdapter to get the user from the database */
        var user = await getUserUseCase.execute(userId)

        /* If the user is not found, return a 404 error */
        if (!user) {
          res.status(404).json(new Error('User not found'));
          return;
        }

        /* Return the user */
        res.status(200).json(user);

      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json(new Error('Internal server error'));
      }
      break;
    case Methods.PUT:
      try {
        console.log('Editting user...');

        var userId = validateUserId(req.query);

        if (userId instanceof Error) {
          res.status(400).json(userId);
          return;
        }

        /* Validate the request body and create a User object */
        var checkedUser = validateUserEdition(userId, req.body);

        if (checkedUser instanceof Error) {
          res.status(400).json(checkedUser);
          return;
        }

        /* Use the PrismaUserAdapter to create the user in the database */
        var newUser = await updateUserUseCase.execute(userId, checkedUser);

        /* Return the new user */
        res.status(201).json(newUser);

      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json(new Error('Internal server error'));
      }
      break;
    case Methods.POST:
      res.status(405).end('Method Not Allowed');
      break;
    case Methods.DELETE:
      res.status(405).end('Method Not Allowed');
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}