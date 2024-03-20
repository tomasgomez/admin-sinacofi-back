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
  validateGetArea,
  validateAreaCreation
} from '../../backend/entities/dataCleaning/area';

import {
  Methods
} from '../../backend/entities/http';

import {
  Area
} from '../../backend/entities/area';

import {
  createAreaUseCase
} from '@/backend/usecases/area/create';

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

          /* Validate the query params and get the AreaId */
          let result = validateGetArea(req.query);

          if (result instanceof Error) {
            res.status(400).json(result);
            return;
          }

          let [areaId, count, offset] = result;


          /* Use the PrismaAreaAdapter to get the Area from the database */
          let area = await getAreaUseCase.execute(areaId, count, offset)

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
          let newArea = await updateAreaUseCase.execute(areaId, checkedArea);

          if (newArea instanceof Error) {
            res.status(400).json(newArea);
            return;
          }

          if (!newArea) {
            res.status(404).json(new Error('Area not found'));
            return;
          }

          let areas: Area[] = [];

          /* Return the updated Area */
          areas.push(newArea);
          res.status(200).json(areas);
          return;

        } catch (error) {
          console.error('Error creating Area:', error);
          res.status(500).json(new Error('Internal server error'));
        }
        break;
      case Methods.POST:
        try {

          let area = validateAreaCreation(req.body);

          if (area instanceof Error) {
            res.status(400).json(area);
            return;
          }

          /* Use the PrismaAreaAdapter to create the Area in the database */
          let newArea = await createAreaUseCase.execute(area);

          if (newArea instanceof Error) {
            res.status(400).json(newArea);
            return;
          }

          let areas: Area[] = [];

          /* Return the new Area */
          areas.push(newArea);
          res.status(201).json(areas);
          return;
        } catch (error: any) {
          console.error('Error creating Area:', error);
          res.status(500).json(new Error('Internal server error'));
        }

      case Methods.DELETE:
          try {

            let areaId = validateAreaId(req.query);

            if (areaId instanceof Error) {
              res.status(400).json(areaId);
              return;
            }

            /* Use the PrismaAreaAdapter to delete the Area from the database */
            let deletedArea = await deleteAreaUseCase.execute(areaId);

            if (deletedArea instanceof Error) {
              res.status(400).json(deletedArea);
              return;
            }

            if (!deletedArea) {
              res.status(404).json(new Error('Area not found'));
              return;
            }

            let areas: Area[] = [];


            /* Return the deleted Area */
            areas.push(deletedArea);
            res.status(200).json(areas);
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