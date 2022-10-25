import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { CarsRoutes } from './car.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { specificationsRoutes } from './specification.routes';
import { usersRoutes } from './User.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/cars', CarsRoutes);
router.use('/rentals', rentalRoutes);
router.use('/password', passwordRoutes);
// como so ha uma autenticacao passe so ela
router.use(authenticateRoutes); // faca isso passando direto o authenticate

export { router };
