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

  it('creates a list', async () => {
    const expected = await Game.findAll();
    const res = await request(app).get('/api/v1/games');

    expect(res.body).toEqual(expected);
  });

  it('gets game by id', async () => {
    const expected = await Game.findById(1);
    const res = await request(app).get(`/api/v1/games/${expected.id}`);
      
    expect(res.body).toEqual(expected);
  });

  it('deletes a game by id', async () => {
    const expected = await Game.findById(1);
    const res = await request(app).delete(`/api/v1/games/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

});
