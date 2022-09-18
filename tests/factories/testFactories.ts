import { faker } from '@faker-js/faker';

export async function createTest() {
  const categories = ['Projeto', 'Prática', 'Recuperação'];

  const test = {
    name: faker.lorem.word(),
    pdfUrl: faker.internet.url(),
    category: categories[Math.floor(Math.random() * (2 - 0 + 1)) + 0],
    discipline: 'JavaScript',
    teacher: 'Diego Pinho',
  };

  return test;
}
