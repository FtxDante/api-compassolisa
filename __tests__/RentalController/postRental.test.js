/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

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
});
