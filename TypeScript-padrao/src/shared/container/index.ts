import {container} from 'tsyringe';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '@modules/car/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/car/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/car/infra/typeorm/repositories/SpecificationRespository';
import { ISpecificationRepository } from '@modules/car/repositories/ISpecificationRepository';

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
