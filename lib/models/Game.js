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

};

