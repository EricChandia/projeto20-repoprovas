import Joi from 'joi';
import { CreateUserData } from '../services/userService';

export const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});


export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required()
});
