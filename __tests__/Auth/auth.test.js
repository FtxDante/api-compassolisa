const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

describe('Post /authenticate', () => {
  test('authenticate with sucess', async () => {
    const auth = {
      email: 'testezinhotestando@email.com',
      senha: '123456'
    };

    const response = await request.post('/api/v1/authenticate').send(auth);

    const { headers, status } = response;
    console.log(response);
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
});
