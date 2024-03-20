import {
  getUserUseCase

} from '@/backend/usecases/user/get';

import {
  NextApiRequest,
  NextApiResponse
} from 'next';

import {
  validateUserId,
  validateUserEdition,
  validateGetUser
} from '../../backend/entities/dataCleaning/user';

import {
  Methods
} from '../../backend/entities/http';

import {
  User
} from '../../backend/entities/user';

import {
  updateUserUseCase
} from '@/backend/usecases/user/update';

import {
  errorHandler,
} from '@/backend/utils/errorHandler';


export default async function handler(req: NextApiRequest, res: NextApiResponse < User[] | Error > ) {
  try {
    const method = req.method;

    switch (method) {
      case Methods.GET:
        try {

          /* Validate the query params and get the userId */
          let result = validateGetUser(req.query);

          if (result instanceof Error) {
            res.status(400).json(result);
            return;
          }

          let [user, count, offset] = result;

          /* Use the PrismaUserAdapter to get the user from the database */
          let users = await getUserUseCase.execute(user, count, offset)

          /* If the user is not found, return a 404 error */
          if (!users) {
            res.status(404).json(new Error('User not found'));
            return;
          }

          /* Return the user */
          res.status(200).json(users);
          return;

        } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).json(new Error('Internal server error'));
          return;
        }
        case Methods.PUT:
          try {
            console.log('Editting user...');

            let userId = validateUserId(req.query);

            if (userId instanceof Error) {
              res.status(400).json(userId);
              return;
            }

            /* Validate the request body and create a User object */
            let checkedUser = validateUserEdition(userId, req.body);

            if (checkedUser instanceof Error) {
              res.status(400).json(checkedUser);
              return;
            }

            /* Use the PrismaUserAdapter to create the user in the database */
            let newUser = await updateUserUseCase.execute(userId, checkedUser);

            console.log("1")

            if (newUser instanceof Error) {
              console.log("2")
              res.status(400).json(newUser);
              return;
            }

            if (!newUser) {
              console.log("3")
              res.status(404).json(new Error('User not found'));
              return;
            }

            let users: User[] = []

            console.log("4")
            users.push(newUser);
            res.status(200).json(users);
            return;


          } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json(new Error('Internal server error'));
            return;
          }
          case Methods.POST:
            res.status(405).end('Method Not Allowed');
            break;
          case Methods.DELETE:
            res.status(405).end('Method Not Allowed');
            break;

          default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Error user:', error);
    errorHandler(error, req, res);
  }
}