const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');

describe('Hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a cat', async () => {
    const expected = {
      name: 'Scruff',
      age: 5,
      food: 'Tuna'
    };
    const res = await request(app).post('/api/v1/cats').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('creates a list', async () => {
    const expected = await Cat.findAll();
    const res = await request(app).get('/api/v1/cats');

    expect(res.body).toEqual(expected);
  });

  it('gets by id', async () => {
    const expected = await Cat.findById(1);
    const res = await request(app).get(`/api/v1/cats/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

});
