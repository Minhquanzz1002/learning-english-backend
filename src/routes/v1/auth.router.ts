import express from 'express';
import { login, register } from '../../api/v1/controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);

export default authRouter;