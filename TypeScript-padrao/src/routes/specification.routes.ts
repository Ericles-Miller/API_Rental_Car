import {response, Router} from 'express'
import { SpecificationsRepository } from '../modules/car/repositories/SpecificationRespository';
import { CreateSpecificationService } from '../modules/car/services/CreateSpecificationService';

const specificationsRoutes = Router();
const specificationRespository = new SpecificationsRepository();


specificationsRoutes.post("/", (request,response) =>{
    const {name,description} = request.body;
    const createSpecificationService = new CreateSpecificationService(specificationRespository);

    createSpecificationService.execute({name, description});

    return response.status(201).send();

})

export {specificationsRoutes};
