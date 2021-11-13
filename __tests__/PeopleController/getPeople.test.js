const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

describe('Get /People/id', () => {
  test('Get all Peoples', async () => {
    const response = await request.get('/api/v1/people');
    const { body, status } = response;

    expect(status).toBe(200);
    body.people.forEach((value) => {
      expect(value).toHaveProperty('_id');
      expect(value).toHaveProperty('nome');
      expect(value).toHaveProperty('cpf');
      expect(value).toHaveProperty('data_nascimento');
      expect(value).toHaveProperty('email');
      expect(value).toHaveProperty('habilitado');
    });
  });
});
