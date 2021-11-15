const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);
const id = '6191b1ae658cbd2617c67b15';
describe('Get /rental', () => {
  jest.setTimeout(30000);

  test('Get all Rentals With Sucess', async () => {
    const response = await request.get(`/api/v1/rental`);
    const { body, status } = response;
    expect(status).toBe(200);
    body.rental.forEach((rental) => {
      expect(rental).toHaveProperty('nome');
      expect(rental).toHaveProperty('cnpj');
      expect(rental).toHaveProperty('atividades');
      expect(rental).toHaveProperty('endereco');
      expect(rental.endereco[0]).toHaveProperty('cep');
      expect(rental.endereco[0]).toHaveProperty('number');
      expect(rental.endereco[0]).toHaveProperty('isFilial');
      expect(rental.endereco[0]).toHaveProperty('logradouro');
      expect(rental.endereco[0]).toHaveProperty('bairro');
      expect(rental.endereco[0]).toHaveProperty('localidade');
      expect(rental.endereco[0]).toHaveProperty('uf');
    });
  });

  test('Get a Rental With Sucess with id', async () => {
    const response = await request.get(`/api/v1/rental/${id}`);
    const { body, status } = response;
    expect(status).toBe(200);

    expect(body).toHaveProperty('nome');
    expect(body).toHaveProperty('cnpj');
    expect(body).toHaveProperty('atividades');
    expect(body).toHaveProperty('endereco');
    body.endereco.forEach((address) => {
      expect(address).toHaveProperty('cep');
      expect(address).toHaveProperty('number');
      expect(address).toHaveProperty('isFilial');
      expect(address).toHaveProperty('logradouro');
      expect(address).toHaveProperty('bairro');
      expect(address).toHaveProperty('localidade');
      expect(address).toHaveProperty('uf');
    });
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
