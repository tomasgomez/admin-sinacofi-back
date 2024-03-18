import {
  getInstitutionUsecase
  
} from '@/backend/usecases/institution/get';

import {
  NextApiRequest,
  NextApiResponse
} from 'next';

// import {
//   validateInstitutionId,
//   validateInstitutionEdition
// } from '../../backend/entities/dataCleaning/institution';

import {
  Methods
} from '../../backend/entities/http';

import {
  FinanciaInstitution as Institution
} from '../../backend/entities/financialInstitution';
import { updateInstitutionUseCase } from '@/backend/usecases/institution/update';

export default async function handler(req: NextApiRequest, res: NextApiResponse < Institution | Error > ) {
  const method = req.method;

  switch (method) {
    case Methods.GET:
      try {
        console.log('Fetching Institution...');

        /* Validate the query params and get the InstitutionId */
        // var institutionId = validateInstitutionId(req.query);

        // if (institutionId instanceof Error) { //TODO: Implement this function
        //   res.status(400).json(institutionId);
        //   return;
        // }

        var institutionId = req.query.id as string;

        /* Use the PrismaInstitutionAdapter to get the Institution from the database */
        var institution = await getInstitutionUsecase.execute(institutionId)

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

        // var institutionId = validateInstitutionId(req.query);

        // if (institutionId instanceof Error) { //TODO: Implement this function
        //   res.status(400).json(InstitutionId);
        //   return;
        // }

        var institutionId = req.query.id as string;

        /* Validate the request body and create a Institution object */
        // var checkedInstitution = validateInstitutionEdition(InstitutionId, req.body);

        // if (checkedInstitution instanceof Error) { //TODO: Implement this function
        //   res.status(400).json(checkedInstitution);
        //   return;
        // }

        var checkedInstitution = req.body as Institution;

        /* Use the PrismaInstitutionAdapter to create the Institution in the database */
        var newInstitution = await updateInstitutionUseCase.execute(institutionId, checkedInstitution);

        /* Return the new Institution */
        res.status(201).json(newInstitution);

      } catch (error) {
        console.error('Error creating Institution:', error);
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