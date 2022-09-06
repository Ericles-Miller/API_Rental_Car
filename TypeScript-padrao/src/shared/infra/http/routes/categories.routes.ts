import { CreateCategoryController } from '@modules/car/UseCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/car/UseCases/importCategories/importCategoryController';
import { ListCategoriesController } from '@modules/car/UseCases/listCategories/ListCategoriesController';
import { Router } from 'express';
import multer from 'multer';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
// importando car de rotas;
const categoriesRoutes = Router();

// declaracao multer
const upload = multer({
  dest: './tmp', // dir do arquivo
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/import', upload.single('file'), ensureAuthenticated, ensureAdmin, importCategoryController.handle);

export { categoriesRoutes }; // exporto para poder referenciar e usar em outros codigos
