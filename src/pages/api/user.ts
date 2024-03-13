import {
  GetUser,
} from '@/backend/usecases/user/getUser';

import {
  CreateUser
} from '@/backend/usecases/user/createUser';

import {
  NextApiRequest,
  NextApiResponse
} from 'next';

import {
  PrismaUserAdapter
} from '@/backend/adapters/prisma/userDatabase';

import {
  validateUserId,
  validateUser
} from '../../backend/entities/dataCleaning/user';
import {
  User
} from '../../backend/entities/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse < User | Error > ) {
  const method = req.method;

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching user...');

        /* Validate the request body and create a User object */
        var userId = validateUserId(req.query);

        /* Use the PrismaUserAdapter to get the user from the database */
        var user = await new GetUser(new PrismaUserAdapter).execute(userId)

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
    case 'POST':
      try {
        console.log('Creating user...');

        /* Validate the request body and create a User object */
        var checkedUser = validateUser(req.body);

        if (checkedUser instanceof Error) {
          res.status(400).json(checkedUser);
          return;
        }

        /* Use the PrismaUserAdapter to create the user in the database */
        var newUser = await new CreateUser(new PrismaUserAdapter).execute(checkedUser);

        /* Return the new user */
        res.status(201).json(newUser);

      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json(new Error('Internal server error'));
      }
      break;
    case 'PUT':
      res.status(405).end('Method Not Allowed');
      break;
    case 'DELETE':
      res.status(405).end('Method Not Allowed');
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}