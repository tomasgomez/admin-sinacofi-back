import {
  getAreaUseCase

} from '@/backend/usecases/area/get';

import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import {
  validateAreaId,
  validateAreaEdition,
  validateGetArea
} from '../../backend/entities/dataCleaning/area';

import {
  Methods
} from '../../backend/entities/http';

import {
  Area
} from '../../backend/entities/area';

import {
  updateAreaUseCase
} from '@/backend/usecases/area/update';

import {
  deleteAreaUseCase
} from '@/backend/usecases/area/delete';

import {
  errorHandler,
} from '@/backend/utils/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse < Area[] | Error > ) {
  try {
    const method = req.method;

    switch (method) {
      case Methods.GET:
        try {
          console.log('Fetching Area...');

          /* Validate the query params and get the AreaId */
          let result = validateGetArea(req.query);

          if (result instanceof Error) {
            res.status(400).json(result);
            return;
          }

          let [areaId, count, offset] = result;


          /* Use the PrismaAreaAdapter to get the Area from the database */
          var area = await getAreaUseCase.execute(areaId, count, offset)

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

          let areaId = validateAreaId(req.query);

          if (areaId instanceof Error) {
            res.status(400).json(areaId);
            return;
          }

          /* Validate the body of the request */
          let checkedArea = validateAreaEdition(areaId, req.body);

          if (checkedArea instanceof Error) {
            res.status(400).json(checkedArea);
            return;
          }

          /* Use the PrismaAreaAdapter to create the Area in the database */
          var newArea = await updateAreaUseCase.execute(areaId, checkedArea);

          if (newArea instanceof Error) {
            res.status(400).json(newArea);
            return;
          }

          if (!newArea) {
            res.status(404).json(new Error('Area not found'));
            return;
          }

          let areas: Area[] = [];

          if (newArea instanceof Area) {
            areas.push(newArea);
            res.status(200).json(areas);
            /* Return the new Area */
            return;
          }

          res.status(500).json(new Error('Internal server error'));
          return;

        } catch (error) {
          console.error('Error creating Area:', error);
          res.status(500).json(new Error('Internal server error'));
        }
        break;
      case Methods.POST:
        res.status(405).end('Method Not Allowed');
        break;
      case Methods.DELETE:
        try {
          console.log('Deleting Area...');

          let areaId = validateAreaId(req.query);

          if (areaId instanceof Error) {
            res.status(400).json(areaId);
            return;
          }

          /* Use the PrismaAreaAdapter to delete the Area from the database */
          var deletedArea = await deleteAreaUseCase.execute(areaId);

          if (deletedArea instanceof Error) {
            res.status(400).json(deletedArea);
            return;
          }

          if (!deletedArea) {
            res.status(404).json(new Error('Area not found'));
            return;
          }

          let areas: Area[] = [];

          if (deletedArea instanceof Area) {
            areas.push(deletedArea);
            res.status(200).json(areas);
            /* Return the deleted Area */
            return;
          }

          res.status(500).json(new Error('Internal server error'));
          return;
        } catch (error) {
          console.error('Error deleting Area:', error);
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