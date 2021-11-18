/* eslint-disable no-shadow */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const app = require('../../app');
const { CarSchema, PeopleSchema } = require('../../app/schema');

const request = supertest(app);

beforeAll(async () => {
  await CarSchema.deleteMany({});
});
beforeEach(async () => {
  await PeopleSchema.deleteMany({
    cpf: '178.186.430-60'
  });
  await CarSchema.deleteMany({});
});
afterAll(async () => {
  await CarSchema.deleteMany({});
});
const createUser = async (email, senha) => {
  const people = {
    nome: 'JESTtest Junior',
    cpf: '178.186.430-60',
    data_nascimento: '03/03/2001',
    email: email,
    senha: senha,
    habilitado: 'sim'
  };

  return request.post('/api/v1/people').send(people);
};

const getToken = async (email, senha) => {
  const { headers } = await request.post('/api/v1/authenticate').send({ email, senha });
  const headertoken = headers['access-control-expose-headers'];
  return headertoken;
};

const generateEmailandPassword = () => {
  const random = Math.random().toString().split('.')[1];
  return {
    email: `${random}@email.com`,
    senha: random
  };
};
const createAuserAndGetToken = async () => {
  const { email, senha } = generateEmailandPassword();
  await createUser(email, senha);
  return getToken(email, senha);
};

describe('car route', () => {
  jest.setTimeout(30000);
  test('Create a car with success', async () => {
    const token = await createAuserAndGetToken();
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
    const token = await getToken();

    const car = {};
    const response = await request.post('/api/v1/car').send(car).set('Authorization', `Bearer ${token}`);
    const { status } = response;
    expect(status).toBe(400);
  });

  test('cant create a car without at leat 1 acessory', async () => {
    const token = await createAuserAndGetToken();
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
    const token = await createAuserAndGetToken();
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
    const token = await createAuserAndGetToken();
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
    const token = await createAuserAndGetToken();
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
  test('Gets unauthorized tryng to post a car without token', async () => {
    const response = await request.post('/api/v1/car');
    const { status } = response;
    expect(status).toBe(401);
  });
  jest.setTimeout(30000);
  test('Get all cars', async () => {
    const token = await createAuserAndGetToken();
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

  test('Get one car', async () => {
    const token = await createAuserAndGetToken();
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
    const postcar = await request.post('/api/v1/car').send(car).set('Authorization', `Bearer ${token}`);
    const { _id } = postcar.body;
    const response = await request.get(`/api/v1/car/${_id}`).set('Authorization', `Bearer ${token}`);
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
    expect(body._id).toBe(_id);
  });

  test('try to get a car with a valid id that doesnt exist in database', async () => {
    const token = await createAuserAndGetToken();
    const response = await request.get('/api/v1/car/6182bd265f458e3ff0ff111f').set('Authorization', `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(404);

    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('NotFound');
    expect(body.name).toBe('id not found');
  });

  test('try to get a car with a invalid id format', async () => {
    const token = await createAuserAndGetToken();
    const response = await request.get('/api/v1/car/aa').set('Authorization', `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(400);

    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('id');
    expect(body[0].name).toBe('invalid id format');
  });
  test('Gets unauthorized tryng to get a car without token', async () => {
    const response = await request.get('/api/v1/car/618d9361f29b23a22cd62966');
    const { status } = response;
    expect(status).toBe(401);
  });

  test('Put a car with success', async () => {
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
    const token = await createAuserAndGetToken();
    await request.post('/api/v1/car').send(car).set('Authorization', `Bearer ${token}`);
    const getId = await request.get('/api/v1/car').set('Authorization', `Bearer ${token}`);
    const id = getId.body.cars[0]._id;

    const carToEdit = {
      modelo: 'Fiat teste 2',
      cor: 'Azul',
      ano: 2019,
      acessorios: [
        {
          descricao: 'Ar Condicionado Show'
        }
      ],
      quantidadePassageiros: 4
    };

    const { body, status } = await request
      .put(`/api/v1/car/${id}`)
      .send(carToEdit)
      .set('Authorization', `Bearer ${token}`);

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
    expect(body.modelo).toBe(carToEdit.modelo);
    expect(body.cor).toBe(carToEdit.cor);
    expect(body.ano).toBe(carToEdit.ano);
    expect(body.quantidadePassageiros).toBe(carToEdit.quantidadePassageiros);
    let i = 0;
    body.acessorios.forEach((value) => {
      expect(value.descricao).toBe(carToEdit.acessorios[i].descricao);
      i += 1;
    });
  });

  test('Put a car with a id that doesnt exist', async () => {
    const car = {
      modelo: 'Fiat teste 2',
      cor: 'Azul',
      ano: 2019,
      acessorios: [
        {
          descricao: 'Ar Condicionado Show'
        }
      ],
      quantidadePassageiros: 4
    };
    const token = await createAuserAndGetToken();
    const response = await request
      .put(`/api/v1/car/619539c8c476a837d38c0e89`)
      .send(car)
      .set('Authorization', `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(404);
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('NotFound');
    expect(body.name).toBe('id not found');
  });
  test('Put a car with a invalid id', async () => {
    const car = {
      modelo: 'Fiat teste 2',
      cor: 'Azul',
      ano: 2019,
      acessorios: [
        {
          descricao: 'Ar Condicionado Show'
        }
      ],
      quantidadePassageiros: 4
    };
    const token = await createAuserAndGetToken();
    const response = await request.put(`/api/v1/car/aaaa`).send(car).set('Authorization', `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('id');
    expect(body[0].name).toBe('invalid id format');
  });

  test('Delete one car', async () => {
    const car = {
      modelo: 'Fiat teste 2',
      cor: 'Azul',
      ano: 2019,
      acessorios: [
        {
          descricao: 'Ar Condicionado Show'
        }
      ],
      quantidadePassageiros: 4
    };
    const token = await createAuserAndGetToken();
    await request.post('/api/v1/car').send(car).set('Authorization', `Bearer ${token}`);
    const getId = await request.get('/api/v1/car').set('Authorization', `Bearer ${token}`);
    const id = getId.body.cars[0]._id;
    const response = await request.delete(`/api/v1/car/${id}`).set('Authorization', `Bearer ${token}`);
    const { body, status } = response;

    expect(status).toBe(204);
    expect(body).toMatchObject({});
  });

  test('try to delete one car with a id that doesnt exist', async () => {
    const token = await createAuserAndGetToken();
    const response = await request
      .delete(`/api/v1/car/619539c8c476a837d38c0e89`)
      .set('Authorization', `Bearer ${token}`);
    const { body, status } = response;

    expect(status).toBe(404);
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('name');
    expect(body.description).toBe('NotFound');
    expect(body.name).toBe('id not found');
  });

  test('try to delete one car with a id that doesnt exist', async () => {
    const token = await createAuserAndGetToken();
    const response = await request.delete(`/api/v1/car/aaa`).set('Authorization', `Bearer ${token}`);
    const { body, status } = response;

    expect(status).toBe(400);
    expect(body[0]).toHaveProperty('description');
    expect(body[0]).toHaveProperty('name');
    expect(body[0].description).toBe('id');
    expect(body[0].name).toBe('invalid id format');
  });

  test('Patch a car with success', async () => {
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
    const token = await createAuserAndGetToken();
    await request.post('/api/v1/car').send(car).set('Authorization', `Bearer ${token}`);
    const getId = await request.get('/api/v1/car').set('Authorization', `Bearer ${token}`);
    const id = getId.body.cars[0]._id;
    const idA = getId.body.cars[0].acessorios[0]._id;
    const carAcessories = { descricao: 'Ar Condicionado Show' };

    const { body, status } = await request
      .patch(`/api/v1/car/${id}/acessorios/${idA}`)
      .send(carAcessories)
      .set('Authorization', `Bearer ${token}`);

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
    expect(body.modelo).toBe(car.modelo);
    expect(body.cor).toBe(car.cor);
    expect(body.ano).toBe(car.ano);
    expect(body.quantidadePassageiros).toBe(car.quantidadePassageiros);
    body.acessorios.forEach((value) => {
      expect(value.descricao).toBe(carAcessories.descricao);
    });
  });
});
