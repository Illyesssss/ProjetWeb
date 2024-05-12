DROP TABLE IF EXISTS informations_user;
DROP TABLE IF EXISTS profil;

CREATE TABLE IF NOT EXISTS informations_user(
    id INTEGER PRIMARY KEY,
    pseudo VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    mdp VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS profil(
    pseudo VARCHAR(255) NOT NULL,
    user_role INTEGER CHECK (user_role IN(1, 2, 3))
);