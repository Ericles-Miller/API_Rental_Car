import { response, Router } from 'express'; //importo da biblioteca express;

// importando lybralys API; 
import { v4 as uuid4 } from 'uuid';
import { Category } from '../modules/car/model/category';
import { CategoriesRepository } from '../modules/car/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/car/services/CreateCategoryService';

// importando car de rotas;
const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();


categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    /**
     * essa definicao abaixo foi feita por causa do constructor 
     * nela passamos como parametro a class do repositorio como 
     * private. essa declaracao esta em CreateCategoryService.ts
     */
    const createCategoryService = new CreateCategoryService(categoriesRepository); // class do repositorio declarada acima 

    createCategoryService.execute({name,description});
    return response.status(201).send();
});

categoriesRoutes.get('/', (request,response) =>{
    const all = categoriesRepository.list(); // chamo a funcao list da classe categoriesRepository 
    return response.json(all); // retorna o arquivo json de categories 
});

export { categoriesRoutes }; // exporto para poder referenciar e usar em outros codigos
