import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CarsRepository } from '@modules/car/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/car/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/car/infra/typeorm/repositories/SpecificationRespository';
import { ICarsRepository } from '@modules/car/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/car/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '@modules/car/repositories/ISpecificationRepository';
import { container } from 'tsyringe';

/**
 * vamos passar a interface Icategoryrepository
 * criando registro de singleton
*/
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
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
