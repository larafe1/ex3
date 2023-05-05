import { Router, type Application } from 'express';

import {
  createUserControllerHandler,
  deleteUserControllerHandler,
  getAllUsersControllerHandler,
  getUserControllerHandler,
  updateUserControllerHandler
} from '@/controllers/user';
import { authMiddleware } from '@/middleware';

const userRouter = Router();

userRouter.get('/v1/user', getUserControllerHandler as Application);

userRouter.get(
  '/v1/user/all',
  authMiddleware as Application,
  getAllUsersControllerHandler as Application
);

userRouter.post('/v1/user', createUserControllerHandler as Application);

userRouter.patch(
  '/v1/user',
  authMiddleware as Application,
  updateUserControllerHandler as Application
);

userRouter.delete(
  '/v1/user',
  authMiddleware as Application,
  deleteUserControllerHandler as Application
);

export { userRouter };
