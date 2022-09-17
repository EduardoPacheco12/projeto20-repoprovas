import supertest from 'supertest';
import app from '../src/app';
import { createUser, loginUser } from './factories/authFactories';
import { client } from '../src/databases/postgres';

const agent = supertest(app);

describe('Test POST /repoprovas/sign-up', () => {
  beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY`;
  });

  it('Should return 201 if registered an user in the correct format', async () => {
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

describe('Test POST /repoprovas/sign-in', () => {
  beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY`;
  });

  it('Should return 200 and a token if the login is done correctly', async () => {
    const user = await createUser();
    await agent.post('/repoprovas/sign-up').send(user);
    const loginUserBody = await loginUser(user);
    const response = await agent.post('/repoprovas/sign-in').send(loginUserBody);

    expect(response.status).toEqual(200);
    expect.stringContaining(response.text);
  });

  it('Should return 401 if the password is wrong', async () => {
    const user = await createUser();
    await agent.post('/repoprovas/sign-up').send(user);
    const loginUserBody = await loginUser(user);
    loginUserBody.password = 'j83yth9whthtjkst';
    loginUserBody.confirmPassword = 'j83yth9whthtjkst';
    const response = await agent.post('/repoprovas/sign-in').send(loginUserBody);

    expect(response.status).toEqual(401);
  });

  it('Should return 404 if the email not found', async () => {
    const user = await createUser();
    const loginUserBody = await loginUser(user);
    const response = await agent.post('/repoprovas/sign-in').send(loginUserBody);

    expect(response.status).toEqual(404);
  });

  it('Should return 422 if the body is sent incorrectly', async () => {
    const user = await createUser();
    const loginUserBody = await loginUser(user);
    loginUserBody.email = '';
    loginUserBody.password = '';
    loginUserBody.confirmPassword = '';
    const response = await agent.post('/repoprovas/sign-in').send(loginUserBody);

    expect(response.status).toEqual(422);
  });

  afterAll(async () => {
    await client.$disconnect();
  });
});
