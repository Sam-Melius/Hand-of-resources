const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
//const Album = require('../lib/models/Album');

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

  //   it('creates a list', async () => {
  //     const expected = await Album.findAll();
  //     const res = await request(app).get('/api/v1/albums');

  //     expect(res.body).toEqual(expected);
  //   });

});
