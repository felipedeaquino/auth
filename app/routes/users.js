import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.create);
router.get('/users', userController.list);

export { router as usersRoutes };