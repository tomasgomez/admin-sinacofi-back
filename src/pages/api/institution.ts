import {
  getInstitutionUsecase
} from '@/backend/usecases/institution/get';

import {
  NextApiRequest,
  NextApiResponse
} from 'next';

import {
  validateInstitutionId,
  validateInstitutionEdition,
  validateGetInstitution
} from '../../backend/entities/dataCleaning/institution';

import {
  Methods
} from '../../backend/entities/http';

import {
  Institution
} from '../../backend/entities/institution';

import {
  updateInstitutionUseCase
} from '@/backend/usecases/institution/update';

import {
  errorHandler,
} from '@/backend/utils/errorHandler';
import {
  deleteInstitutionUseCase
} from '@/backend/usecases/institution/delete';

export default async function handler(req: NextApiRequest, res: NextApiResponse < Institution[] | Error > ) {
  try {

    const method = req.method;

    switch (method) {
      case Methods.GET:
        try {
          console.log('Fetching Institution...');

          /* Validate the query params and get the InstitutionId */
          let result = validateGetInstitution(req.query);

          if (result instanceof Error) {
            res.status(400).json(result);
            return;
          }

          let [institutionId, count, offset] = result;


          /* Use the PrismaInstitutionAdapter to get the Institution from the database */
          var institution = await getInstitutionUsecase.execute(institutionId, count, offset)

          /* If the Institution is not found, return a 404 error */
          if (!institution) {
            res.status(404).json(new Error('Institution not found'));
            return;
          }

          /* Return the Institution */
          res.status(200).json(institution);

        } catch (error) {
          console.error('Error fetching Institutions:', error);
          res.status(500).json(new Error('Internal server error'));
        }
        break;
      case Methods.PUT:
        try {
          console.log('Editting Institution...');

          let institutionId = validateInstitutionId(req.query);

          if (institutionId instanceof Error) {
            res.status(400).json(institutionId);
            return;
          }

          /* Validate the Institution attributes */
          let checkedInstitution = validateInstitutionEdition(institutionId, req.body);

          if (checkedInstitution instanceof Error) {
            res.status(400).json(checkedInstitution);
            return;
          }

          /* Use the PrismaInstitutionAdapter to create the Institution in the database */
          var newInstitution = await updateInstitutionUseCase.execute(institutionId, checkedInstitution);

          if (newInstitution instanceof Error) {
            res.status(500).json(newInstitution);
            return;
          }

          if (!newInstitution) {
            res.status(404).json(new Error('Institution not found'));
            return;
          }

          let institutions: Institution[] = [];

          if (newInstitution instanceof Institution) {
            institutions.push(newInstitution);
            res.status(200).json(institutions);
            return;
          }

          res.status(500).json(new Error('Internal server error'));
          return;

        } catch (error) {
          console.error('Error creating Institution:', error);
          res.status(500).json(new Error('Internal server error'));
        }
        break;
      case Methods.POST:
        res.status(405).end('Method Not Allowed');
        break;
      case Methods.DELETE:
        try {
          console.log('Deleting Institution...');

          let institutionId = validateInstitutionId(req.query);

          if (institutionId instanceof Error) {
            res.status(400).json(institutionId);
            return;
          }

          /* Use the PrismaInstitutionAdapter to delete the Institution from the database */
          var deletedInstitution = await deleteInstitutionUseCase.execute(institutionId);

          if (deletedInstitution instanceof Error) {
            res.status(400).json(deletedInstitution);
            return;
          }

          if (!deletedInstitution) {
            res.status(404).json(new Error('Institution not found'));
            return;
          }

          let institutions: Institution[] = [];

          if (deletedInstitution instanceof Institution) {
            institutions.push(deletedInstitution);
            res.status(200).json(institutions);
            /* Return the deleted Institution */
            return;
          }

          res.status(500).json(new Error('Internal server error'));
          return;
        } catch (error) {
          console.error('Error deleting Institution:', error);
          res.status(500).json(new Error('Internal server error'));
        }

        default:
          res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.log('Error:', error);
    errorHandler(error, req, res);
  }
}