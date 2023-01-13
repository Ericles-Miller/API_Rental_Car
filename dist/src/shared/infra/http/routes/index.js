"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authenticate_routes_1 = require("./authenticate.routes");
const car_routes_1 = require("./car.routes");
const categories_routes_1 = require("./categories.routes");
const password_routes_1 = require("./password.routes");
const rental_routes_1 = require("./rental.routes");
const specification_routes_1 = require("./specification.routes");
const User_routes_1 = require("./User.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use('/categories', categories_routes_1.categoriesRoutes);
router.use('/specifications', specification_routes_1.specificationsRoutes);
router.use('/users', User_routes_1.usersRoutes);
router.use('/cars', car_routes_1.CarsRoutes);
router.use('/rentals', rental_routes_1.rentalRoutes);
router.use('/password', password_routes_1.passwordRoutes);
// como so ha uma autenticacao passe so ela
router.use(authenticate_routes_1.authenticateRoutes); // faca isso passando direto o authenticate
