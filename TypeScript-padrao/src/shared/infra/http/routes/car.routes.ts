import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/car/UseCases/createcar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/car/UseCases/CreateCarSpecificationUseCase/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/car/UseCases/listAvailableCars/listAvailableCarsController';
import { UploadCarImageController } from '@modules/car/UseCases/uploadCarImage/uploadCarImageController';
import { Router } from 'express';
import multer from 'multer';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const CarsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

// middle de authenticacao passando
CarsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
CarsRoutes.get('/available', listAvailableCarsController.handle);
CarsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
CarsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, upload.array('images'), uploadCarImageController.handle);

export { CarsRoutes };
