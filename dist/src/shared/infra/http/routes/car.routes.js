"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsRoutes = void 0;
const upload_1 = __importDefault(require("@config/upload"));
const CreateCarController_1 = require("@modules/car/UseCases/createcar/CreateCarController");
const CreateCarSpecificationController_1 = require("@modules/car/UseCases/CreateCarSpecification/CreateCarSpecificationController");
const listAvailableCarsController_1 = require("@modules/car/UseCases/listAvailableCars/listAvailableCarsController");
const uploadCarImageController_1 = require("@modules/car/UseCases/uploadCarImage/uploadCarImageController");
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const ensureAdmin_1 = require("../middlewares/ensureAdmin");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const CarsRoutes = (0, express_1.Router)();
exports.CarsRoutes = CarsRoutes;
const createCarController = new CreateCarController_1.CreateCarController();
const listAvailableCarsController = new listAvailableCarsController_1.ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController_1.CreateCarSpecificationController();
const uploadCarImageController = new uploadCarImageController_1.UploadCarImageController();
const upload = (0, multer_1.default)(upload_1.default);
// middle de authenticacao passando
CarsRoutes.post('/', ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCarController.handle);
CarsRoutes.get('/available', listAvailableCarsController.handle);
CarsRoutes.post('/specifications/:id', ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCarSpecificationController.handle);
CarsRoutes.post('/images/:id', ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, upload.array('images'), uploadCarImageController.handle);
