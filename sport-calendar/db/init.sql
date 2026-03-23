CREATE TABLE IF NOT EXISTS sports (
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS teams (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    sport_id    INT NOT NULL REFERENCES sports(id)
);

CREATE TABLE IF NOT EXISTS events (
    id              SERIAL PRIMARY KEY,
    starts_at       TIMESTAMP NOT NULL,
    home_team_id    INT NOT NULL REFERENCES teams(id),
    away_team_id    INT NOT NULL REFERENCES teams(id)
);

INSERT INTO sports (name) VALUES ('Football'), ('Ice Hockey'), ('Basketball'), ('Tennis');

INSERT INTO teams (name, sport_id) VALUES
    ('Salzburg', 1),
    ('Sturm', 1),
    ('Bayern', 1),
    ('KAC', 2),
    ('Capitals', 2),
    ('Blackhawks', 2),
    ('Lakers', 3),
    ('Warriors', 3),
    ('Celtics', 3),
    ('Roger Federer', 4),
    ('Rafael Nadal', 4),
    ('Iga Świątek', 4);

INSERT INTO events (starts_at, home_team_id, away_team_id) VALUES
    ('2019-07-18 18:30:00', 1, 2),
    ('2019-10-23 09:45:00', 4, 5),
    ('2019-11-25 18:35:00', 5, 6),
    ('2020-01-24 17:00:00', 7, 8),
    ('2019-02-12 07:00:00', 11, 10);