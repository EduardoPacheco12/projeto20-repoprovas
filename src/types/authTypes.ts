import { users } from '@prisma/client';

interface signIn {
  email: string;
  password: string;
  confirmPassword: string;
}

export type usersPrismaSchema = users;

export type signUpBody = Omit<users, 'id'>;

export type signInBody = signIn;
