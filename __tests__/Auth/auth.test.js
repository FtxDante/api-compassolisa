const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);
describe('Post /authenticate', () => {
  jest.setTimeout(30000);
  test('authenticate with sucess', async () => {
    const people = {
      nome: 'JESTtest Junior',
      cpf: '432.020.530-86',
      data_nascimento: '03/03/2001',
      email: 'testezinhotestando@email.com',
      senha: '123456',
      habilitado: 'sim'
    };

    await request.post('/api/v1/people').send(people);

    const auth = {
      email: 'testezinhotestando@email.com',
      senha: '123456'
    };

    const response = await request.post('/api/v1/authenticate').send(auth);

    const { headers, status } = response;
    expect(status).toBe(200);
    expect(headers).toHaveProperty('access-control-expose-headers');
  });

  test('wrong username or password', async () => {
    const auth = {
      email: 'testezinhotestando2@email.com',
      senha: '123456789'
    };

    const response = await request.post('/api/v1/authenticate').send(auth);

    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('Unauthorized');
    expect(body.name).toBe('Email or password invalid');
  });

  test('login with invalid email', async () => {
    const auth = {
      email: 'testezinhotestando2email',
      senha: '123456789'
    };

    const response = await request.post('/api/v1/authenticate').send(auth);

    const { status } = response;
    expect(status).toBe(400);
  });
});
