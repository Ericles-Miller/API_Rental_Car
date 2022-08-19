import {container} from 'tsyringe';
import { ICategoriesRepository } from '../../modules/car/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/car/repositories/implementations/CategoriesRepository';



/**
 * vamos passar a interface Icategoryrepository
 * criando registro de singleton 
*/
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);





