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
    expect(body.endereco[0].isFilial).toBe(false);
  });

  test('Get a Rental With Sucess, with filial', async () => {
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

    expect(body.endereco[0].isFilial).toBe(false);
  });

  test('Get a Rental with bad format ID', async () => {
    const response = await request.get('/api/v1/rental/u12832189e8912e');
    const { body, status } = response;
    expect(status).toBe(400);

    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('id');
    expect(body[0].name).toBe('invalid id format');
  });

  test('Get a Rental with id Not Found', async () => {
    const response = await request.get('/api/v1/rental/618c09496f34ed17186c9d5d');
    const { body, status } = response;
    expect(status).toBe(404);

    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('NotFound');
    expect(body.name).toBe('id not found');
  });
});
