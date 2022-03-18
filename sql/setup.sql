-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS albums;

CREATE TABLE cats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    age INT,
    food TEXT
);

CREATE TABLE albums (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    band TEXT,
    tracks INT
);

INSERT INTO
    cats (name, age, food)
VALUES
    ('Scruff', 5, 'Tuna'),
    ('Schmidt', 9, 'Chicken');

INSERT INTO
    albums (name, band, tracks)
VALUES
    ('American Idiot', 'Green Day', 13),
    ('Typhoons', 'Royal Blood', 11)
