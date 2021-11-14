/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

describe('Get /People/id', () => {
  jest.setTimeout(30000);
  test('Get one people', async () => {
    const id = '6182bd265f458e3ea0cf111b';
    const response = await request.get(`/api/v1/people/${id}`);
    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toHaveProperty('_id');
    expect(body).toHaveProperty('nome');
    expect(body).toHaveProperty('cpf');
    expect(body).toHaveProperty('data_nascimento');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('habilitado');
    expect(body._id).toBe(id);
  });

  test('try to get a people with a valid id that doesnt exist in database', async () => {
    const response = await request.get('/api/v1/people/6182bd265f458e3ff0ff111f');
    const { body, status } = response;
    expect(status).toBe(404);

    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('NotFound');
    expect(body.name).toBe('id not found');
  });

  test('try to get a people with a invalid id format', async () => {
    const response = await request.get('/api/v1/people/aa');
    const { body, status } = response;
    expect(status).toBe(400);

    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('id');
    expect(body[0].name).toBe('invalid id format');
  });
});
