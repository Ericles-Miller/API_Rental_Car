import { CreateSpecificationController } from '@modules/car/UseCases/createSpecification/creationSpecificationController';
import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.use(ensureAuthenticated); // import routes token
specificationsRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export { specificationsRoutes };
