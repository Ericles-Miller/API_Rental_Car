import {container} from 'tsyringe';
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UserRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '../../modules/car/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/car/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/car/repositories/implementations/SpecificationRespository';
import { ISpecificationRepository } from '../../modules/car/repositories/ISpecificationRepository';

/**
 * vamos passar a interface Icategoryrepository
 * criando registro de singleton 
*/
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);
