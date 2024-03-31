import { Router } from 'express';

import * as userController from '../controllers/userController.js';
import { verifyToken } from '../middlewares/auth.js';
import { loginValidator } from '../validators/loginValidator.js';

/**
 * Cria um novo objeto Router do Express.
 * @type {function}
 */
const router = Router();

router.post('/login', loginValidator, userController.login);
router.post('/register', userController.create);
router.get('/users', verifyToken, userController.list);

export { router as usersRoutes };
