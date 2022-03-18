const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/Game');

describe('Hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  afterAll(() => {
    pool.end();
  });

  it('creates a game', async () => {
    const expected = {
      name: 'Elden Ring',
      console: 'Playstation',
      players: 1
    };
    const res = await request(app).post('/api/v1/games').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

});
