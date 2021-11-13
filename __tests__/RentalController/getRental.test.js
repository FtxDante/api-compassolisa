const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

describe('Get /rental', () => {
  jest.setTimeout(30000);

  test('Get a Rental With Sucess', async () => {
    const response = await request.get('/api/v1/rental/618c09496e34ed17186c9c5d');
    const { body, status } = response;
    expect(status).toBe(200);

    expect(body).toHaveProperty('nome');
    expect(body).toHaveProperty('cnpj');
    expect(body).toHaveProperty('atividades');
    expect(body).toHaveProperty('endereco');
    expect(body.endereco[0]).toHaveProperty('cep');
    expect(body.endereco[0]).toHaveProperty('number');
    expect(body.endereco[0]).toHaveProperty('isFilial');
  });

  test('Get a Rental with bad ID', async () => {
    const response = await request.get('/api/v1/rental/u12832189e8912e');
    const { body, status } = response;
    expect(status).toBe(400);

    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('id');
    expect(body[0].name).toBe('invalid id format');
  });
});
