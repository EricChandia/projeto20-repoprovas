import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaMiddleware';
import { userSchema } from '../schemas/userSchema';
import { signIn, signUp } from './../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', validateSchema(userSchema), signUp);
authRouter.post('/signin', validateSchema(userSchema), signIn);

export default authRouter;
