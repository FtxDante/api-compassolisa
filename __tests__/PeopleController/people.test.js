/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const app = require('../../app');
const { PeopleSchema } = require('../../app/schema');

const request = supertest(app);

beforeAll(async () => {
  await PeopleSchema.deleteMany({
    nome: /JESTivaldo Junior/
  });
});
beforeEach(async () => {
  await PeopleSchema.deleteMany({
    nome: /JESTivaldo Junior/
  });
});
afterAll(async () => {
  await PeopleSchema.deleteMany({
    nome: /JESTivaldo Junior/
  });
});

describe('People routes', () => {
  jest.setTimeout(30000);
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

  test('cant post if people age is less than 18', async () => {
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
    const oldPeople = {
      nome: 'JESTivaldo Junior',
      cpf: '600.945.580-43',
      data_nascimento: '03/03/2001',
      email: 'jestivaldojunior@jest2.com',
      senha: '123456',
      habilitado: 'sim'
    };
    await request.post('/api/v1/people').send(oldPeople);
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
    expect(status).toBe(409);
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('Conflict');
    expect(body.name).toBe(`CPF ${people.cpf} already in use`);
  });

  test('email must be unique', async () => {
    const oldPeople = {
      nome: 'JESTivaldo Junior',
      cpf: '064.728.890-74',
      data_nascimento: '03/03/2001',
      email: 'jestivaldojunior@jest.com',
      senha: '123456',
      habilitado: 'sim'
    };
    await request.post('/api/v1/people').send(oldPeople);
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
    expect(status).toBe(409);
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('Conflict');
    expect(body.name).toBe(`Email ${people.email} already in use`);
  });

  test('Get all Peoples', async () => {
    const response = await request.get('/api/v1/people');
    const { body, status } = response;

    expect(status).toBe(200);
    body.people.forEach((value) => {
      expect(value).toHaveProperty('_id');
      expect(value).toHaveProperty('nome');
      expect(value).toHaveProperty('cpf');
      expect(value).toHaveProperty('data_nascimento');
      expect(value).toHaveProperty('email');
      expect(value).toHaveProperty('habilitado');
    });
  });

  test('Get one people', async () => {
    const people = {
      nome: 'JESTivaldo Junior',
      cpf: '600.945.580-43',
      data_nascimento: '03/03/2001',
      email: 'jestivaldojunior@jest.com',
      senha: '123456',
      habilitado: 'sim'
    };
    await request.post('/api/v1/people').send(people);

    const getId = await request.get('/api/v1/people');
    const id = getId.body.people[0]._id;

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

  test('Put a people with success', async () => {
    const people = {
      nome: 'JESTivaldo Junior',
      cpf: '600.945.580-43',
      data_nascimento: '03/03/2001',
      email: 'jestivaldojunior@jest.com',
      senha: '123456',
      habilitado: 'sim'
    };

    await request.post('/api/v1/people').send(people);
    const getId = await request.get('/api/v1/people');
    const id = getId.body.people[0]._id;

    const peopleToEdit = {
      nome: 'JESTivaldo Junior 2',
      cpf: '050.579.910-35',
      data_nascimento: '05/05/2002',
      email: 'jestivaldojunior2@jes1t.com',
      senha: '123456',
      habilitado: 'nao'
    };
    const response = await request.put(`/api/v1/people/${id}`).send(peopleToEdit);
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toHaveProperty('_id');
    expect(body).toHaveProperty('nome');
    expect(body).toHaveProperty('cpf');
    expect(body).toHaveProperty('data_nascimento');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('habilitado');
    expect(body.nome).toBe(peopleToEdit.nome);
    expect(body.cpf).toBe(peopleToEdit.cpf);
    expect(body.data_nascimento).toBe(new Date(peopleToEdit.data_nascimento).toISOString());
    expect(body.email).toBe(peopleToEdit.email);
    expect(body.habilitado).toBe(peopleToEdit.habilitado);
  });

  test('Put a people with a id that doesnt exist', async () => {
    const peopleToEdit = {
      nome: 'JESTivaldo Junior 2',
      cpf: '050.579.910-35',
      data_nascimento: '05/05/2002',
      email: 'jestivaldojunior2@jes1t.com',
      senha: '123456',
      habilitado: 'nao'
    };
    const response = await request.put(`/api/v1/people/619539c8c476a837d38c0e89`).send(peopleToEdit);
    const { body, status } = response;
    expect(status).toBe(404);
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('NotFound');
    expect(body.name).toBe('id not found');
  });

  test('Put a people with a invalid id', async () => {
    const peopleToEdit = {
      nome: 'JESTivaldo Junior 2',
      cpf: '050.579.910-35',
      data_nascimento: '05/05/2002',
      email: 'jestivaldojunior2@jes1t.com',
      senha: '123456',
      habilitado: 'nao'
    };
    const response = await request.put(`/api/v1/people/aaaa`).send(peopleToEdit);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('id');
    expect(body[0].name).toBe('invalid id format');
  });

  test('Delete one people', async () => {
    const people = {
      nome: 'JESTivaldo Junior',
      cpf: '600.945.580-43',
      data_nascimento: '03/03/2001',
      email: 'jestivaldojunior@jest.com',
      senha: '123456',
      habilitado: 'sim'
    };
    await request.post('/api/v1/people').send(people);

    const getId = await request.get('/api/v1/people');
    const id = getId.body.people[0]._id;

    const response = await request.delete(`/api/v1/people/${id}`);
    const { body, status } = response;

    expect(status).toBe(204);
    expect(body).toMatchObject({});
  });

  test('try to delete one people with a id that doesnt exist', async () => {
    const people = {
      nome: 'JESTivaldo Junior',
      cpf: '600.945.580-43',
      data_nascimento: '03/03/2001',
      email: 'jestivaldojunior@jest.com',
      senha: '123456',
      habilitado: 'sim'
    };
    await request.post('/api/v1/people').send(people);
    const response = await request.delete(`/api/v1/people/619539c8c476a837d38c0e89`);
    const { body, status } = response;

    expect(status).toBe(404);
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('NotFound');
    expect(body.name).toBe('id not found');
  });

  test('try to delete one people with a invalid id', async () => {
    const people = {
      nome: 'JESTivaldo Junior',
      cpf: '600.945.580-43',
      data_nascimento: '03/03/2001',
      email: 'jestivaldojunior@jest.com',
      senha: '123456',
      habilitado: 'sim'
    };
    await request.post('/api/v1/people').send(people);
    const response = await request.delete(`/api/v1/people/aaaa`);
    const { body, status } = response;

    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('id');
    expect(body[0].name).toBe('invalid id format');
  });
});
