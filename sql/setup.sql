-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS shows;


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

CREATE TABLE games (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    console TEXT,
    players INT
);

CREATE TABLE cars (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT,
    year INT
);

CREATE TABLE shows (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    seasons INT,
    episodes INT
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
    ('Typhoons', 'Royal Blood', 11);

INSERT INTO
    games (name, console, players)
VALUES
    ('Elden Ring', 'Playstaion', 1),
    ('Mario Kart', 'Nintendo', 4);

INSERT INTO
    cars (name, color, year)
VALUES
    ('Accord', 'Green', 1999),
    ('Chevelle', 'Black', 1969);

INSERT INTO
    shows (title, seasons, episodes)
VALUES
    ('Peaky Blinders', 6, 33),
    ('That 70s Show', 8, 200);

