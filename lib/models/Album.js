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
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            albums
            `,
      
    );
    return rows.map((row) => new Album(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
        *
      FROM
        albums
      WHERE
        id=$1
        `,
      [id]
    );
    return new Album(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        albums
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Album(rows[0]);
  }

  static async updateById(id, att) {
    const album = await Album.findById(id);
    const updated = { ...album, ...att };
    const { name, band, tracks } = updated;
    const { rows } = await pool.query(
      `UPDATE
        albums
      SET
        name=$1,
        band=$2,
        tracks=$3
      WHERE
        id=$4
      RETURNING
        *
      `,
      [name, band, tracks, id]
    );
    return new Album(rows[0]);
  }

};
