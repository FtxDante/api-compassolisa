const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

describe('Post /People', () => {
  test('Post a People with success', async () => {
    const people = {
      nome: 'JESTivaldo Junior',
      cpf: '600.945.580-43',
      data_nascimento: '03/03/2001',
      email: 'jestivaldojunior@jest.com',
      senha: '123456',
      habilitado: 'sim'
    };

    const response = await request.post('/api/v1/people').send(people);
    const { body, status } = response;

    expect(status).toBe(201);
    expect(body).toHaveProperty('nome');
    expect(body).toHaveProperty('cpf');
    expect(body).toHaveProperty('data_nascimento');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('habilitado');

    expect(body.nome).toBe(people.nome);
    expect(body.cpf).toBe(people.cpf);
    expect(body.data_nascimento).toBe(new Date(people.data_nascimento).toISOString());
    expect(body.email).toBe(people.email);
    expect(body.habilitado).toBe(people.habilitado);
  });

  test('cant create a people without all fields', async () => {
    const people = {};
    const response = await request.post('/api/v1/people').send(people);
    const { status } = response;
    expect(status).toBe(400);
  });

  test('cant post id people age is less than 18', async () => {
    const people = {
      nome: 'JESTivaldo Junior',
      cpf: '600.945.580-43',
      data_nascimento: '03/03/2011',
      email: 'jestivaldojunior@jest.com',
      senha: '123456',
      habilitado: 'sim'
    };

    const response = await request.post('/api/v1/people').send(people);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('data_nascimento');
    expect(body[0].name).toBe('must be at last 18 years old');
  });

  test('cpf must be valid', async () => {
    const people = {
      nome: 'JESTivaldo Junior',
      cpf: '600.94558043',
      data_nascimento: '03/03/2001',
      email: 'jestivaldojunior@jest.com',
      senha: '123456',
      habilitado: 'sim'
    };

    const response = await request.post('/api/v1/people').send(people);
    const { body, status } = response;
    expect(status).toBe(400);

    body.forEach((value) => {
      expect(value).toHaveProperty('description');
      expect(value).toHaveProperty('name');
      expect(value.description).toBe('cpf');
    });
  });

  test('password length must be equal or greather than 6', async () => {
    const people = {
      nome: 'JESTivaldo Junior',
      cpf: '600.945.580-43',
      data_nascimento: '03/03/2001',
      email: 'jestivaldojunior@jest.com',
      senha: '12345',
      habilitado: 'sim'
    };

    const response = await request.post('/api/v1/people').send(people);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('senha');
    expect(body[0].name).toBe('"senha" length must be at least 6 characters long');
  });

  test('email must be valid', async () => {
    const people = {
      nome: 'JESTivaldo Junior',
      cpf: '600.945.580-43',
      data_nascimento: '03/03/2001',
      email: 'jestivaldojunior.com',
      senha: '123456',
      habilitado: 'sim'
    };

    const response = await request.post('/api/v1/people').send(people);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('email');
    expect(body[0].name).toBe(`Email ${people.email} is invalid`);
  });

  test('habilitado must be sim ou nao', async () => {
    const people = {
      nome: 'JESTivaldo Junior',
      cpf: '600.945.580-43',
      data_nascimento: '03/03/2001',
      email: 'jestivaldo@junior.com',
      senha: '123456',
      habilitado: 'aviao'
    };

    const response = await request.post('/api/v1/people').send(people);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('habilitado');
    expect(body[0].name).toBe('"habilitado" must be one of [sim, nao]');
  });

  test('cpf must be unique', async () => {
    const people = {
      nome: 'joaozinho shippuden',
      cpf: '485.277.440-40',
      data_nascimento: '03/03/2001',
      email: 'joaozinhoshippuden@email.com',
      senha: '123456',
      habilitado: 'sim'
    };

    const response = await request.post('/api/v1/people').send(people);
    const { body, status } = response;
    expect(status).toBe(409);
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('Conflict');
    expect(body.name).toBe(`CPF ${people.cpf} already in use`);
  });

  test('email must be unique', async () => {
    const people = {
      nome: 'joaozinho shippuden',
      cpf: '485.277.440-40',
      data_nascimento: '2001-03-03T03:00:00.000Z',
      email: 'joazinhoshippu11den@emai1.com',
      senha: '123456',
      habilitado: 'sim'
    };

    const response = await request.post('/api/v1/people').send(people);
    const { body, status } = response;
    expect(status).toBe(409);
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('Conflict');
    expect(body.name).toBe(`Email ${people.email} already in use`);
  });
});
