import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ProfileUserController } from '@modules/accounts/useCases/profileUserCase/ProfileUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import uploadConfig from '../../../../config/upload';

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

usersRoutes.get(
  '/profile',
  ensureAuthenticated,
  profileUserController.handle,
);

export { usersRoutes };
