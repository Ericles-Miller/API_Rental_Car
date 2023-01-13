"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specificationsRoutes = void 0;
const creationSpecificationController_1 = require("@modules/car/UseCases/createSpecification/creationSpecificationController");
const express_1 = require("express");
const ensureAdmin_1 = require("../middlewares/ensureAdmin");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const specificationsRoutes = (0, express_1.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new creationSpecificationController_1.CreateSpecificationController();
specificationsRoutes.use(ensureAuthenticated_1.ensureAuthenticated); // import routes token
specificationsRoutes.post('/', ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createSpecificationController.handle);
