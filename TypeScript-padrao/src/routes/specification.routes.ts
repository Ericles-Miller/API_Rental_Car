import {response, Router} from 'express'
import { createSpecificationController } from '../modules/car/UseCases/createSpecification';

const specificationsRoutes = Router();


specificationsRoutes.post("/", (request,response) =>{
    return createSpecificationController.handle(request, response);
});

export {specificationsRoutes};
