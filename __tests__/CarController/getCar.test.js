const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

describe('Get /car', () => {
  jest.setTimeout(30000);
  test('Get all cars', async () => {
    const response = await request.get('/api/v1/car');
    const { body, status } = response;

    expect(status).toBe(200);
    body.cars.forEach((value) => {
      expect(value).toHaveProperty('_id');
      expect(value).toHaveProperty('modelo');
      expect(value).toHaveProperty('cor');
      expect(value).toHaveProperty('ano');
      expect(value).toHaveProperty('acessorios');
      expect(value).toHaveProperty('quantidadePassageiros');
      expect(value.acessorios[0]).toHaveProperty('descricao');
      expect(value.acessorios[0]).toHaveProperty('_id');
    });
  });
});
