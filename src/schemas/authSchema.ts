import Joi from 'joi';
import { signUpBody, signInBody } from '../types/authTypes';

export const signUpSchema = Joi.object<signUpBody>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});

export const signInSchema = Joi.object<signInBody>({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});
