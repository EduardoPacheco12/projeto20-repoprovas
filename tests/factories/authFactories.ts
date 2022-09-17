import { faker } from '@faker-js/faker';

export async function createUser() {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return user;
}
