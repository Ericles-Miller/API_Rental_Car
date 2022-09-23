import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUsersRepository } from '@modules/accounts/Repositories/IUsersRepository';
import { CarsImageRepository } from '@modules/car/infra/typeorm/repositories/CarsImageRepository';
import { CarsRepository } from '@modules/car/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/car/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/car/infra/typeorm/repositories/SpecificationRespository';
import { ICarsImageRepository } from '@modules/car/repositories/ICarsImageRepitory';
import { ICarsRepository } from '@modules/car/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/car/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '@modules/car/repositories/ISpecificationRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/Repositories/IRentalsRepository';
import { container } from 'tsyringe';
import '@shared/container/providers';
// eslint-disable-next-line import-helpers/order-imports
import { IUsersTokenRepository } from '@modules/accounts/Repositories/IUsersTokenRepositories';
// eslint-disable-next-line import-helpers/order-imports
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

/**
 * vamos passar a interface Icategoryrepository
 * criando registro de singleton
*/
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository,
);

container.registerSingleton<ICarsImageRepository>(
  'CarsImageRepository',
  CarsImageRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
