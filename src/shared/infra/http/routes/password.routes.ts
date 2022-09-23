import { SendForgetPasswordMailController } from '@modules/accounts/useCases/sendForgetPasswordMail/SendForgetPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgetPasswordMailController = new SendForgetPasswordMailController();

passwordRoutes.post('/forgot', sendForgetPasswordMailController.handle);

export { passwordRoutes };
