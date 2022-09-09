import { CreateCarController } from '@modules/car/UseCases/createcar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/car/UseCases/CreateCarSpecificationUseCase/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/car/UseCases/listAvailableCars/listAvailableCarsController';
import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const CarsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

// middle de authenticacao passando
CarsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
CarsRoutes.get('/available', listAvailableCarsController.handle);
CarsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);

export { CarsRoutes };
