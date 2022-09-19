import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaMiddleware';
import { signInSchema, signUpSchema } from '../schemas/userSchema';
import { signIn, signUp } from './../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', validateSchema(signUpSchema), signUp);
authRouter.post('/signin', validateSchema(signInSchema), signIn);

export default authRouter;
