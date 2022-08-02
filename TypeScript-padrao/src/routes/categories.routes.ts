import { response, Router } from 'express'; //importo da biblioteca express;

// importando lybralys API; 
import { v4 as uuid4 } from 'uuid';
import { Category } from '../modules/car/model/category';
import { CategoriesRepository } from '../modules/car/repositories/CategoriesRepository';
import { createCategorycontroller } from '../UseCases/createCategory';

// importando car de rotas;
const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();


categoriesRoutes.post("/", (request, response) => {
    /**chamo a nova classe que criei no arquivo createCategorycontroller 
     * e em seguida instancio a sua funcao handle passando os parametros 
     * request e response como foi definido 
     */
    return createCategorycontroller.handle(request,response);
});

categoriesRoutes.get('/', (request,response) =>{
    const all = categoriesRepository.list(); // chamo a funcao list da classe categoriesRepository 
    return response.json(all); // retorna o arquivo json de categories 
});

export { categoriesRoutes }; // exporto para poder referenciar e usar em outros codigos
