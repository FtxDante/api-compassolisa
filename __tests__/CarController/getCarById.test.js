/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

describe('Get /car/id', () => {
  test('Get one car', async () => {
    const id = '618d9361f29b23a22cd62966';
    const response = await request.get(`/api/v1/car/${id}`);
    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toHaveProperty('_id');
    expect(body).toHaveProperty('modelo');
    expect(body).toHaveProperty('cor');
    expect(body).toHaveProperty('ano');
    expect(body).toHaveProperty('acessorios');
    expect(body).toHaveProperty('quantidadePassageiros');
    body.acessorios.forEach((value) => {
      expect(value).toHaveProperty('_id');
      expect(value).toHaveProperty('descricao');
    });
    expect(body._id).toBe(id);
  });

  test('try to get a car with a valid id that doesnt exist in database', async () => {
    const response = await request.get('/api/v1/car/6182bd265f458e3ff0ff111f');
    const { body, status } = response;
    expect(status).toBe(404);

    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('NotFound');
    expect(body.name).toBe('id not found');
  });

  test('try to get a car with a invalid id format', async () => {
    const response = await request.get('/api/v1/car/aa');
    const { body, status } = response;
    expect(status).toBe(400);

    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('id');
    expect(body[0].name).toBe('invalid id format');
  });
});
