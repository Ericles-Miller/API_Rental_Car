"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UserRepository");
const CarsImageRepository_1 = require("@modules/car/infra/typeorm/repositories/CarsImageRepository");
const CarsRepository_1 = require("@modules/car/infra/typeorm/repositories/CarsRepository");
const CategoriesRepository_1 = require("@modules/car/infra/typeorm/repositories/CategoriesRepository");
const SpecificationRespository_1 = require("@modules/car/infra/typeorm/repositories/SpecificationRespository");
const RentalsRepository_1 = require("@modules/rentals/infra/typeorm/repositories/RentalsRepository");
const tsyringe_1 = require("tsyringe");
require("@shared/container/providers");
// eslint-disable-next-line import-helpers/order-imports
const UsersTokensRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UsersTokensRepository");
/**
 * vamos passar a interface Icategoryrepository
 * criando registro de singleton
*/
tsyringe_1.container.registerSingleton('CategoriesRepository', CategoriesRepository_1.CategoriesRepository);
tsyringe_1.container.registerSingleton('SpecificationsRepository', SpecificationRespository_1.SpecificationsRepository);
tsyringe_1.container.registerSingleton('UsersRepository', UserRepository_1.UsersRepository);
tsyringe_1.container.registerSingleton('CarsRepository', CarsRepository_1.CarsRepository);
tsyringe_1.container.registerSingleton('CarsImageRepository', CarsImageRepository_1.CarsImageRepository);
tsyringe_1.container.registerSingleton('RentalsRepository', RentalsRepository_1.RentalsRepository);
tsyringe_1.container.registerSingleton('UsersTokensRepository', UsersTokensRepository_1.UsersTokensRepository);
