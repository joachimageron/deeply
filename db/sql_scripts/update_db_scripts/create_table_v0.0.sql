DROP TABLE IF EXISTS Follows_Requests, Blocked, Follows, Reactions_Comments, Reactions_Messages, Messages_Media, Comments_Media, Confidences_Media, Media, Comments, Messages, Confidences, Questions, Users CASCADE;

-- Création de la table Users
CREATE TABLE Users (
                       id SERIAL PRIMARY KEY,
                       handle TEXT NOT NULL,
                       pseudo TEXT NOT NULL,
                       password TEXT NOT NULL,
                       mail TEXT NOT NULL,
                       profile_picture TEXT,
                       param_user TEXT
);

-- Création de la table Questions
CREATE TABLE Questions (
                           id SERIAL PRIMARY KEY,
                           text TEXT NOT NULL,
                           date DATE NOT NULL
);

-- Création de la table Confidences
CREATE TABLE Confidences (
                             id SERIAL PRIMARY KEY,
                             question_id INTEGER REFERENCES Questions(id),
                             sender_id INTEGER REFERENCES Users(id),
                             text TEXT NOT NULL,
                             date DATE NOT NULL
);

-- Création de la table Messages
CREATE TABLE Messages (
                          id SERIAL PRIMARY KEY,
                          message_id INTEGER,
                          sender_id INTEGER REFERENCES Users(id),
                          receiver_id INTEGER REFERENCES Users(id),
                          confidence_id INTEGER REFERENCES Confidences(id),
                          comment_id INTEGER, -- La référence à la table de commentaires sera ajoutée après sa création
                          text TEXT NOT NULL,
                          date DATE NOT NULL,
                          seen BOOLEAN
);

-- Création de la table Comments
CREATE TABLE Comments (
                          id SERIAL PRIMARY KEY,
                          comment_id INTEGER,
                          confidence_id INTEGER REFERENCES Confidences(id),
                          sender_id INTEGER REFERENCES Users(id),
                          message_id INTEGER REFERENCES Messages(id),
                          text TEXT NOT NULL,
                          date DATE NOT NULL
);

-- Mise à jour de la table Messages pour inclure la référence à Comments
ALTER TABLE Messages ADD FOREIGN KEY (comment_id) REFERENCES Comments(id);

-- Ajout des contraintes de clé étrangère pour les champs nouvellement ajoutés
ALTER TABLE Messages ADD FOREIGN KEY (message_id) REFERENCES Messages(id);
ALTER TABLE Comments ADD FOREIGN KEY (comment_id) REFERENCES Comments(id);


-- Création des tables pour la gestion des médias
CREATE TABLE Media (
                       id SERIAL PRIMARY KEY,
                       url TEXT NOT NULL,
                       type TEXT NOT NULL
);

CREATE TABLE Confidences_Media (
                                   id SERIAL PRIMARY KEY,
                                   confidence_id INTEGER REFERENCES Confidences(id),
                                   media_id INTEGER REFERENCES Media(id)
);

CREATE TABLE Comments_Media (
                                id SERIAL PRIMARY KEY,
                                comment_id INTEGER REFERENCES Comments(id),
                                media_id INTEGER REFERENCES Media(id)
);

CREATE TABLE Messages_Media (
                                id SERIAL PRIMARY KEY,
                                message_id INTEGER REFERENCES Messages(id),
                                media_id INTEGER REFERENCES Media(id)
);

-- Création de la table Reactions
CREATE TABLE Reactions (
                           id SERIAL PRIMARY KEY,
                           text TEXT NOT NULL
);

-- Création des tables de liaison pour les réactions
CREATE TABLE Reactions_Messages (
                                    id SERIAL PRIMARY KEY,
                                    message_id INTEGER REFERENCES Messages(id),
                                    reaction_id INTEGER REFERENCES Reactions(id)
);

CREATE TABLE Reactions_Comments (
                                    id SERIAL PRIMARY KEY,
                                    comment_id INTEGER REFERENCES Comments(id),
                                    reaction_id INTEGER REFERENCES Reactions(id)
);

-- Création des tables pour la gestion des relations entre utilisateurs
CREATE TABLE Follows (
                         id SERIAL PRIMARY KEY,
                         user_a INTEGER REFERENCES Users(id),
                         user_b INTEGER REFERENCES Users(id),
                         date DATE NOT NULL,
                         status TEXT NOT NULL
);

CREATE TABLE Follows_Requests (
                                  id SERIAL PRIMARY KEY,
                                  sender INTEGER REFERENCES Users(id),
                                  target INTEGER REFERENCES Users(id),
                                  date DATE NOT NULL,
                                  status TEXT NOT NULL
);

CREATE TABLE Blocked (
                         id SERIAL PRIMARY KEY,
                         sender INTEGER REFERENCES Users(id),
                         target INTEGER REFERENCES Users(id),
                         date DATE NOT NULL,
                         status TEXT NOT NULL
);
