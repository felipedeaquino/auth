import { Router } from 'express';

import * as userController from '../controllers/userController.js';
import { loginValidator } from '../validators/loginValidator.js';

const router = Router();

router.post('/login', loginValidator, userController.login);
router.post('/register', userController.create);
router.get('/users', userController.list);

export { router as usersRoutes };
