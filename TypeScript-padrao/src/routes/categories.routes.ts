import { Router } from 'express'; //importo da biblioteca express;
import { CreateCategoryController }  from '../modules/car/UseCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../modules/car/UseCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '../modules/car/UseCases/importCategories/importCategoryController';


import multer from 'multer';
// importando car de rotas;
const categoriesRoutes = Router();

// declaracao multer 
const upload = multer({
    dest:"./tmp", // dir do arquivo 
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle);

export { categoriesRoutes }; // exporto para poder referenciar e usar em outros codigos
