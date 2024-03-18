import {
  getAreaUseCase
  
} from '@/backend/usecases/area/get';

import {
  NextApiRequest,
  NextApiResponse
} from 'next';

// import {
//   validateAreaId,
//   validateAreaEdition
// } from '../../backend/entities/dataCleaning/area';

import {
  Methods
} from '../../backend/entities/http';

import {
  Area
} from '../../backend/entities/area';
import { updateAreaUseCase } from '@/backend/usecases/area/update';

export default async function handler(req: NextApiRequest, res: NextApiResponse < Area | Error > ) {
  const method = req.method;

  switch (method) {
    case Methods.GET:
      try {
        console.log('Fetching Area...');

        /* Validate the query params and get the AreaId */
        // var areaId = validateAreaId(req.query); // TODO: Implement this function
        // if (areaId instanceof Error) {
        //   res.status(400).json(AreaId);
        //   return;
        // }

        var areaId = req.query.id as string;

        /* Use the PrismaAreaAdapter to get the Area from the database */
        var area = await getAreaUseCase.execute(areaId)

        /* If the Area is not found, return a 404 error */
        if (!area) {
          res.status(404).json(new Error('Area not found'));
          return;
        }

        /* Return the Area */
        res.status(200).json(area);

      } catch (error) {
        console.error('Error fetching Area:', error);
        res.status(500).json(new Error('Internal server error'));
      }
      break;
    case Methods.PUT:
      try {
        console.log('Editting Area...');

        // var AreaId = validateAreaId(req.query);

        // if (AreaId instanceof Error) { //TODO: Implement this function
        //   res.status(400).json(AreaId);
        //   return;
        // }

        var areaId = req.query.id as string;

        // /* Validate the request body and create a Area object */
        // var checkedArea = validateAreaEdition(areaId, req.body); //TODO: Implement this function

        // if (checkedArea instanceof Error) {
        //   res.status(400).json(checkedArea);
        //   return;
        // }
        
        var checkedArea = req.body as Area;

        /* Use the PrismaAreaAdapter to create the Area in the database */
        var newArea = await updateAreaUseCase.execute(areaId, checkedArea);

        /* Return the new Area */
        res.status(201).json(newArea);

      } catch (error) {
        console.error('Error creating Area:', error);
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