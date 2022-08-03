import { Router } from 'express'; //importo da biblioteca express;
import { createCategorycontroller } from '../modules/car/UseCases/createCategory';
import { listCategoriesController } from '../modules/car/UseCases/listCategories';

// importando car de rotas;
const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
    /**chamo a nova classe que criei no arquivo createCategorycontroller 
     * e em seguida instancio a sua funcao handle passando os parametros 
     * request e response como foi definido 
     */
    return createCategorycontroller.handle(request,response);
});

categoriesRoutes.get('/', (request,response) =>{
    return listCategoriesController.handle(request,response);
});

export { categoriesRoutes }; // exporto para poder referenciar e usar em outros codigos
