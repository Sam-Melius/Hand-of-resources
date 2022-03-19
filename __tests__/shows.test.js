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

  it('creates a list', async () => {
    const expected = await Show.findAll();
    const res = await request(app).get('/api/v1/shows');

    expect(res.body).toEqual(expected);
  });

  it('gets show by id', async () => {
    const expected = await Show.findById(1);
    const res = await request(app).get(`/api/v1/shows/${expected.id}`);
      
    expect(res.body).toEqual(expected);
  });

  it('deletes a show by id', async () => {
    const expected = await Show.findById(1);
    const res = await request(app).delete(`/api/v1/shows/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('updates a show by id', async () => {
    const expected = {
      id: expect.any(String),
      title: 'Peaky Blinders',
      seasons: 7,
      episodes: 39
    };
    const res = await request(app)
      .patch('/api/v1/shows/1')
      .send({ seasons: 7, episodes: 39 });

    expect(res.body).toEqual(expected);
  });
  
});
