import { response, Router } from 'express'
import { CreateSpecificationController } from '../modules/car/UseCases/createSpecification/creationSpecificationController';

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);


export {specificationsRoutes};
