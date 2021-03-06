const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  age;
  food;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.food = row.food;
  }
  
  static async insert({ name, age, food }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
            cats (name, age, food)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [name, age, food]
    );
    return new Cat(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        cats
        `,
    );
    return rows.map((row) => new Cat(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
        *
      FROM
        cats
      WHERE
        id=$1
        `,
      [id]
    );
    return new Cat(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        cats
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Cat(rows[0]);
  }

  static async updateById(id, att) {
    const cat = await Cat.findById(id);
    const updated = { ...cat, ...att };
    const { name, age, food } = updated;
    const { rows } = await pool.query(
      `UPDATE
        cats
      SET
        name=$1,
        age=$2,
        food=$3
      WHERE
        id=$4
      RETURNING
        *
      `,
      [name, age, food, id]
    );
    return new Cat(rows[0]);
  }
  
};
