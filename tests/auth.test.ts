import supertest from 'supertest';
import app from '../src/app';
import { createUser } from './factories/authFactories';
import { client } from '../src/databases/postgres';

const agent = supertest(app);

describe('Test POST /repoprovas/sign-up', () => {
  beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY`;
  });

  it('Should return 201 if registered an item in the correct format', async () => {
    const user = await createUser();
    const response = await agent.post('/repoprovas/sign-up').send(user);

    expect(response.status).toEqual(201);
  });

  it('Should return 409 if email already exists in db', async () => {
    const user = await createUser();
    await agent.post('/repoprovas/sign-up').send(user);
    const response = await agent.post('/repoprovas/sign-up').send(user);

    expect(response.status).toEqual(409);
  });

  it('Should return 422 if the body is sent incorrectly', async () => {
    const user = await createUser();
    user.email = '';
    user.password = '';
    const response = await agent.post('/repoprovas/sign-up').send(user);

    expect(response.status).toEqual(422);
  });

  afterAll(async () => {
    await client.$disconnect();
  });
});
