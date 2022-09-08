import { CreateCarController } from '@modules/car/UseCases/createcar/CreateCarController';
import { ListAvailableCarsController } from '@modules/car/UseCases/listAvailableCars/listAvailableCarsController';
import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const CarsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

// middle de authenticacao passando
CarsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
CarsRoutes.get('/available', listAvailableCarsController.handle);
export { CarsRoutes };
