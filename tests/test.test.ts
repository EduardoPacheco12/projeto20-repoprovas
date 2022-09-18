import supertest from 'supertest';
import app from '../src/app';
import { client } from '../src/databases/postgres';
import { createUser, loginUser } from './factories/authFactories';
import { createTest } from './factories/testFactories';

const agent = supertest(app);

describe('Test POST /repoprovas/tests/create', () => {
  it('Should return 201 if registered an test in the correct format', async () => {
    const user = await createUser();
    const register = await agent.post('/repoprovas/sign-up').send(user);
    const loginUserBody = await loginUser(user);
    const login = await agent.post('/repoprovas/sign-in').send(loginUserBody);
    const token = login.text;
    const test = await createTest();
    const response = await agent
      .post('/repoprovas/tests/create')
      .set({ Authorization: `Bearer ${token}` })
      .send(test);

    expect(response.status).toEqual(201);
  });

  it('Should return 404 if it does not find registered category, professor or discipline', async () => {
    const user = await createUser();
    await agent.post('/repoprovas/sign-up').send(user);
    const loginUserBody = await loginUser(user);
    const login = await agent.post('/repoprovas/sign-in').send(loginUserBody);
    const token = login.text;
    const test = await createTest();
    test.category = 'P1';
    test.discipline = 'htrsjrjrsykm';
    test.teacher = 'gkrweoktokh';

    const response = await agent
      .post('/repoprovas/tests/create')
      .set({ Authorization: `Bearer ${token}` })
      .send(test);

    expect(response.status).toEqual(404);
  });

  it('Should return 422 if the body is sent incorrectly', async () => {
    const user = await createUser();
    await agent.post('/repoprovas/sign-up').send(user);
    const loginUserBody = await loginUser(user);
    const login = await agent.post('/repoprovas/sign-in').send(loginUserBody);
    const token = login.text;
    const test = await createTest();
    test.category = '';
    test.name = '';
    test.pdfUrl = '';
    test.teacher = '';
    test.discipline = '';

    const response = await agent
      .post('/repoprovas/tests/create')
      .set({ Authorization: `Bearer ${token}` })
      .send(test);

    expect(response.status).toEqual(422);
  });
});
