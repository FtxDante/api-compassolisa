/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlemluaG90ZXN0YW5kb0BlbWFpbC5jb20iLCJoYWJpbGl0YWRvIjoic2ltIiwiaWF0IjoxNjM2OTA3MjQ0LCJleHAiOjE2MzY5NDMyNDR9.rTmeFBNJ3JZCucYnSYz01gCzHqy8qhZSVwzRFdb_J6c';

describe('POST /car', () => {
  jest.setTimeout(30000);
  test('Create a car with success', async () => {
    const car = {
      modelo: 'Fiat teste',
      cor: 'Prata',
      ano: 2018,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        }
      ],
      quantidadePassageiros: 3
    };
    const response = await request.post('/api/v1/car').send(car).set('Authorization', `Bearer ${token}`);
    const { body, status } = response;

    expect(status).toBe(201);
    expect(body).toHaveProperty('modelo');
    expect(body).toHaveProperty('cor');
    expect(body).toHaveProperty('ano');
    expect(body).toHaveProperty('acessorios');
    expect(body).toHaveProperty('quantidadePassageiros');
    expect(body.acessorios[0]).toHaveProperty('_id');
    expect(body.acessorios[0]).toHaveProperty('descricao');

    expect(body.modelo).toBe(car.modelo);
    expect(body.cor).toBe(car.cor);
    expect(body.ano).toBe(car.ano);
    expect(JSON.stringify(body.acessorios._id)).toBe(JSON.stringify(car.acessorios._id));
    expect(JSON.stringify(body.acessorios.descricao)).toBe(JSON.stringify(car.acessorios.descricao));
    expect(body.quantidadePassageiros).toBe(car.quantidadePassageiros);
  });

  test('cant create a car without all fields', async () => {
    const car = {};
    const response = await request.post('/api/v1/car').send(car).set('Authorization', `Bearer ${token}`);
    const { status } = response;
    expect(status).toBe(400);
  });

  test('cant create a car without at leat 1 acessory', async () => {
    const car = {
      modelo: 'Fiat teste',
      cor: 'Prata',
      ano: 2018,
      acessorios: [],
      quantidadePassageiros: 3
    };
    const response = await request.post('/api/v1/car').send(car).set('Authorization', `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].name).toBe('"acessorios" must contain at least 1 items');
  });
  test('car yeat cant be lower than 1950', async () => {
    const car = {
      modelo: 'Fiat teste',
      cor: 'Prata',
      ano: 1949,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        }
      ],
      quantidadePassageiros: 3
    };
    const response = await request.post('/api/v1/car').send(car).set('Authorization', `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('ano');
    expect(body[0].name).toBe('"ano" must be greater than or equal to 1950');
  });

  test('car yeat cant be greater than 2022', async () => {
    const car = {
      modelo: 'Fiat teste',
      cor: 'Prata',
      ano: 2023,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        }
      ],
      quantidadePassageiros: 3
    };
    const response = await request.post('/api/v1/car').send(car).set('Authorization', `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('ano');
    expect(body[0].name).toBe('"ano" must be less than or equal to 2022');
  });
  test('car yeat cant be greater than 2022', async () => {
    const car = {
      modelo: 'Fiat teste',
      cor: 'Prata',
      ano: 2020,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Ar Condicionado'
        }
      ],
      quantidadePassageiros: 3
    };
    const response = await request.post('/api/v1/car').send(car).set('Authorization', `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('acessorios[1]');
    expect(body[0].name).toBe('"acessorios[1]" contains a duplicate value');
  });
});
