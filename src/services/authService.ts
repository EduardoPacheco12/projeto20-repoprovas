import { signInBody, signUpBody, usersPrismaSchema } from '../types/authTypes';
import * as authRepository from '../repositories/authRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signUp(body: signUpBody) {
  const email: string = body.email;
  const password: string = body.password;

  const verifyEmail = await authRepository.verifyEmail(email);
  if (verifyEmail) {
    throw { type: 'conflict', message: 'Email already exists' };
  }

  const encryptedPassword: string = bcrypt.hashSync(password, 10);

  await authRepository.insertUser(email, encryptedPassword);
}

export async function signIn(body: signInBody) {
  const email: string = body.email;
  const password: string = body.password;

  const verifyEmail: usersPrismaSchema = await authRepository.verifyEmail(email);
  if (!verifyEmail) {
    throw { type: 'not_found', message: 'Email not found' };
  }
  const id: number = verifyEmail.id;

  const verifyPassword: boolean = bcrypt.compareSync(password, verifyEmail.password);
  if (!verifyPassword) {
    throw { type: 'unauthorized', message: 'Wrong password, try again' };
  }

  const token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 10800, //3h
  });

  return token;
}
