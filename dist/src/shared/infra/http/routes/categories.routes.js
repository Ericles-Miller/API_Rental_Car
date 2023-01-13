"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const CreateCategoryController_1 = require("@modules/car/UseCases/createCategory/CreateCategoryController");
const importCategoryController_1 = require("@modules/car/UseCases/importCategories/importCategoryController");
const ListCategoriesController_1 = require("@modules/car/UseCases/listCategories/ListCategoriesController");
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const ensureAdmin_1 = require("../middlewares/ensureAdmin");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
// importando car de rotas;
const categoriesRoutes = (0, express_1.Router)();
exports.categoriesRoutes = categoriesRoutes;
// declaracao multer
const upload = (0, multer_1.default)({
    dest: './tmp', // dir do arquivo
});
const createCategoryController = new CreateCategoryController_1.CreateCategoryController();
const importCategoryController = new importCategoryController_1.ImportCategoryController();
const listCategoriesController = new ListCategoriesController_1.ListCategoriesController();
categoriesRoutes.post('/', ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/import', upload.single('file'), ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, importCategoryController.handle);
