/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const app = require('../../app');
const { RentalSchema } = require('../../app/schema');

const request = supertest(app);

beforeAll(async () => {
  await RentalSchema.deleteMany({});
});
beforeEach(async () => {
  await RentalSchema.deleteMany({});
});
afterAll(async () => {
  await RentalSchema.deleteMany({});
});

describe('Post Rental', () => {
  test('Post a Rental with success', async () => {
    const rental = {
      nome: 'Localiza Rent a Car',
      cnpj: '42.134.716/0001-21',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '60714-320',
          number: '3212',
          isFilial: 'false'
        },
        {
          cep: '69317-101',
          number: '500',
          isFilial: 'true'
        }
      ]
    };

    const response = await request.post('/api/v1/rental').send(rental);
    const { body, status } = response;

    expect(status).toBe(201);
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

  test('Try to post a rental with a cnpj that already exists', async () => {
    const rental1 = {
      nome: 'Localiza Rent a Car',
      cnpj: '42.134.716/0001-21',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '60714-320',
          number: '3212',
          isFilial: 'false'
        }
      ]
    };
    await request.post('/api/v1/rental').send(rental1);

    const rental = {
      nome: 'Localiza Rent a Car',
      cnpj: '42.134.716/0001-21',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '60714-320',
          number: '3212',
          isFilial: 'false'
        }
      ]
    };

    const response = await request.post('/api/v1/rental').send(rental);
    const { body, status } = response;
    expect(status).toBe(409);
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('Conflict');
    expect(body.name).toBe(`Cnpj ${rental.cnpj} already in use`);
  });

  test('Try to post a rental with a invalid cnpj', async () => {
    const rental = {
      nome: 'Localiza Rent a Car',
      cnpj: '42.1340001-21',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '60714-320',
          number: '3212',
          isFilial: 'false'
        }
      ]
    };

    const response = await request.post('/api/v1/rental').send(rental);
    const { body, status } = response;
    expect(status).toBe(400);

    body.forEach((value) => {
      expect(value).toHaveProperty('description');
      expect(value).toHaveProperty('name');
      expect(value.description).toBe('cnpj');
    });
  });

  test('Try to post a rental without a head office address', async () => {
    const rental = {
      nome: 'Localiza Rent a Car',
      cnpj: '42.134.716/0001-21',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '60714-320',
          number: '3212',
          isFilial: 'false'
        },
        {
          cep: '69317-101',
          number: '500',
          isFilial: 'false'
        }
      ]
    };

    const response = await request.post('/api/v1/rental').send(rental);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('endereco');
    expect(body[0].name).toBe('Only one head office is allowed');
  });
  test('Try to post a rental with  more than one head office address', async () => {
    const rental = {
      nome: 'Localiza Rent a Car',
      cnpj: '42.134.716/0001-21',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '60714-320',
          number: '3212',
          isFilial: 'true'
        }
      ]
    };

    const response = await request.post('/api/v1/rental').send(rental);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('endereco');
    expect(body[0].name).toBe('At least one head office is required');
  });

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
    const rental1 = {
      nome: 'Localiza Rent a Car',
      cnpj: '42.134.716/0001-21',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '60714-320',
          number: '3212',
          isFilial: 'false'
        }
      ]
    };

    await request.post('/api/v1/rental').send(rental1);

    const getId = await request.get('/api/v1/rental');
    const { id } = getId.body.rental[0];

    const response = await request.get(`/api/v1/rental/${id}`);
    const { body, status } = response;
    console.log(body);
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
