import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPassword/ResetPasswordUserController';
import { SendForgetPasswordMailController } from '@modules/accounts/useCases/sendForgetPasswordMail/SendForgetPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgetPasswordMailController = new SendForgetPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgetPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };
