const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlemluaG90ZXN0YW5kb0BlbWFpbC5jb20iLCJoYWJpbGl0YWRvIjoic2ltIiwiaWF0IjoxNjM2OTA3MjQ0LCJleHAiOjE2MzY5NDMyNDR9.rTmeFBNJ3JZCucYnSYz01gCzHqy8qhZSVwzRFdb_J6c';

describe('Get /car', () => {
  jest.setTimeout(30000);
  test('Get all cars', async () => {
    const response = await request.get('/api/v1/car').set('Authorization', `Bearer ${token}`);
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
  test('Gets unauthorized tryng to get all cars without token', async () => {
    const response = await request.get('/api/v1/car');
    const { status } = response;
    expect(status).toBe(401);
  });
});
