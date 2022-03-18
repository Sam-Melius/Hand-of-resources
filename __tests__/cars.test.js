const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');

describe('Hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  afterAll(() => {
    pool.end();
  });

  it('creates a car', async () => {
    const expected = {
      name: 'Accord',
      color: 'Green',
      year: 1999
    };
    const res = await request(app).post('/api/v1/cars').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('creates a list', async () => {
    const expected = await Car.findAll();
    const res = await request(app).get('/api/v1/cars');

    expect(res.body).toEqual(expected);
  });

  it('gets car by id', async () => {
    const expected = await Car.findById(1);
    const res = await request(app).get(`/api/v1/cars/${expected.id}`);
      
    expect(res.body).toEqual(expected);
  });

});
