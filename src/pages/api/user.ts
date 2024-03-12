import {
  GetUser
} from '@/usecases/user/getUser';
import {
  NextApiRequest,
  NextApiResponse
} from 'next';

import {
  PrismaUserAdapter
} from '@/adapters/prisma/userDatabase';

import {
  validateUserId
} from '../../entities/dataCleaning/user';
import {
  User
} from '../../entities/user';

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
      res.status(405).end('Method Not Allowed');
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