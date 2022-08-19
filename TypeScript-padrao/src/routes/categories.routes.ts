import { Router } from 'express'; //importo da biblioteca express;
import { CreateCategoryController }  from '../modules/car/UseCases/createCategory/CreateCategoryController';
import { listCategoriesController } from '../modules/car/UseCases/listCategories';
import { importCategoryController } from '../modules/car/UseCases/importCategories';
import multer from 'multer';
// importando car de rotas;
const categoriesRoutes = Router();

// declaracao multer 
const upload = multer({
    dest:"./tmp", // dir do arquivo 
});

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request,response);
});

categoriesRoutes.get('/', (request,response) =>{
    return listCategoriesController.handle(request,response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) =>{
    return importCategoryController.handle(request,response);
});

export { categoriesRoutes }; // exporto para poder referenciar e usar em outros codigos
