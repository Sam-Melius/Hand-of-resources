const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Album = require('../lib/models/Album');

describe('Hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('creates an album', async () => {
    const expected = {
      name: 'American Idiot',
      band: 'Green Day',
      tracks: 13
    };
    const res = await request(app).post('/api/v1/albums').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('creates a list', async () => {
    const expected = await Album.findAll();
    const res = await request(app).get('/api/v1/albums');

    expect(res.body).toEqual(expected);
  });

  it('gets album by id', async () => {
    const expected = await Album.findById(1);
    const res = await request(app).get(`/api/v1/albums/${expected.id}`);
      
    expect(res.body).toEqual(expected);
  });

  it('deletes an album by id', async () => {
    const expected = await Album.findById(1);
    const res = await request(app).delete(`/api/v1/albums/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('updates an album by id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'American Idiot',
      band: 'Green Day',
      tracks: 12
    };
    const res = await request(app)
      .patch('/api/v1/albums/1')
      .send({ tracks: 12 });

    expect(res.body).toEqual(expected);
  });

});
