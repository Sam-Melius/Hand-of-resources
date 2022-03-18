const pool = require('../utils/pool');

module.exports = class Car {
  id;
  name;
  color;
  year;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.year = row.year;
  }

  static async insert({ name, color, year }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
            cars (name, color, year)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [name, color, year]
    );
    return new Car(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            cars
            `,
      
    );
    return rows.map((row) => new Car(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
        *
      FROM
        cars
      WHERE
        id=$1
        `,
      [id]
    );
    return new Car(rows[0]);
  }

};

