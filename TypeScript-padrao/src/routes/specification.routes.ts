import { response, Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/car/UseCases/createSpecification/creationSpecificationController';

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.use(ensureAuthenticated); // import routes token 
specificationsRoutes.post("/", createSpecificationController.handle);


export {specificationsRoutes};
