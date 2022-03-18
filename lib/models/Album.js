const pool = require('../utils/pool');

module.exports = class Album {
  id;
  name;
  band;
  tracks;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.band = row.band;
    this.tracks = row.tracks;
  }

  static async insert({ name, band, tracks }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
            albums (name, band, tracks)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [name, band, tracks]
    );
    return new Album(rows[0]);
  }

  static async findAll() {
    const { rows } = pool.query(
      `
          SELECT
            *
          FROM
            albums
            `,
      
    );
    return rows.map((row) => new Album(row));
  }

};
