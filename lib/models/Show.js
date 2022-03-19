const pool = require('../utils/pool');

module.exports = class Show {
  id;
  title;
  seasons;
  episodes;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.seasons = row.seasons;
    this.episodes = row.episodes;
  }

  static async insert({ title, seasons, episodes }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
            shows (title, seasons, episodes)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [title, seasons, episodes]
    );
    return new Show(rows[0]);
  }

};
