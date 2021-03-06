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

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            shows
            `,
      
    );
    return rows.map((row) => new Show(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
        *
      FROM
        shows
      WHERE
        id=$1
        `,
      [id]
    );
    return new Show(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        shows
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Show(rows[0]);
  }

  static async updateById(id, att) {
    const show = await Show.findById(id);
    const updated = { ...show, ...att };
    const { title, seasons, episodes } = updated;
    const { rows } = await pool.query(
      `UPDATE
        shows
      SET
        title=$1,
        seasons=$2,
        episodes=$3
      WHERE
        id=$4
      RETURNING
        *
      `,
      [title, seasons, episodes, id]
    );
    return new Show(rows[0]);
  }

};
