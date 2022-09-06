import { CreateCarController } from '@modules/car/UseCases/createcar/CreateCarController';
import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const CarsRoutes = Router();

const createCarController = new CreateCarController();

// middle de authenticacao passando
CarsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);

export { CarsRoutes };
