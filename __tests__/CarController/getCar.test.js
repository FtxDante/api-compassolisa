const supertest = require('supertest');
const app = require('../../app');
const { CarSchema } = require('../../app/schema');

const request = supertest(app);

beforeAll(async () => {
  await CarSchema.deleteMany({});
});
beforeEach(async () => {
  await CarSchema.deleteMany({});
});
afterAll(async () => {
  await CarSchema.deleteMany({});
});

const person = {
  nome: 'Paulo Sérgio',
  cpf: '094.273.780-69',
  data_nascimento: '2000-03-03T03:00:00.000Z',
  email: 'grand2077d@chase.com',
  habilitado: 'sim',
  senha: '40028922'
};

const login = {
  email: 'grand2077d@chase.com',
  senha: '40028922'
};

describe('Get /car', () => {
  jest.setTimeout(30000);
  test('Get all cars', async () => {
    await request.post('/api/v1/people').send(person);
    const { header } = await request.post('/api/v1/authenticate').send(login);
    const response = await request.get('/api/v1/car').set('Authorization', `Bearer ${header.token}`);
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
