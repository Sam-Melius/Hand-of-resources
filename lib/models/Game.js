const pool = require('../utils/pool');

module.exports = class Game {
  id;
  name;
  console;
  players;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.console = row.console;
    this.players = row.players;
  }

  static async insert({ name, console, players }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
            games (name, console, players)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [name, console, players]
    );
    return new Game(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            games
            `,
      
    );
    return rows.map((row) => new Game(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
        *
      FROM
        games
      WHERE
        id=$1
        `,
      [id]
    );
    return new Game(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        games
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Game(rows[0]);
  }

  static async updateById(id, att) {
    const game = await Game.findById(id);
    const updated = { ...game, ...att };
    const { name, console, players } = updated;
    const { rows } = await pool.query(
      `UPDATE
        games
      SET
        name=$1,
        console=$2,
        players=$3
      WHERE
        id=$4
      RETURNING
        *
      `,
      [name, console, players, id]
    );
    return new Game(rows[0]);
  }

};

