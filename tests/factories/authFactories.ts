import { faker } from '@faker-js/faker';
import { signInBody, signUpBody, usersPrismaSchema } from '../../src/types/authTypes';

export async function createUser() {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return user;
}

export async function loginUser(user: signUpBody) {
  const userLogin = {
    email: user.email,
    password: user.password,
    confirmPassword: user.password,
  };

  return userLogin;
}
