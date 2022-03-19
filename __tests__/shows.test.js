const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Show = require('../lib/models/Show');

describe('Hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  afterAll(() => {
    pool.end();
  });

  it('creates a show', async () => {
    const expected = {
      title: 'Peaky Blinders',
      seasons: 6,
      episodes: 33
    };
    const res = await request(app).post('/api/v1/shows').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
  
});
