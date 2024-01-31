-- create table item (
--   id int unsigned primary key auto_increment not null,
--   title varchar(255) not null
-- );

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null
);

CREATE DATABASE IF NOT EXISTS checkpoint4;
USE checkpoint4;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS liste;
DROP TABLE IF EXISTS categorie;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
id INT NOT NULL AUTO_INCREMENT, 
PRIMARY KEY (id),
firstname VARCHAR(45) NOT NULL,
lastname VARCHAR(45) NOT NULL,
mail VARCHAR(80) NOT NULL UNIQUE,
pseudo VARCHAR(45) NOT NULL,
password VARCHAR(255) NOT NULL);

CREATE TABLE categorie (
id INT NOT NULL AUTO_INCREMENT, 
PRIMARY KEY (id),
name VARCHAR(255) NOT NULL
);

CREATE TABLE liste (
id INT NOT NULL AUTO_INCREMENT, 
PRIMARY KEY (id),
task VARCHAR(255) NOT NULL,
isComplete BOOLEAN NOT NULL DEFAULT false,
isEditing BOOLEAN NOT NULL DEFAULT false,
names VARCHAR(20) NOT NULL,
categorie_id INT NOT NULL,
FOREIGN KEY(categorie_id)
REFERENCES categorie(id),
user_id INT NOT NULL,
FOREIGN KEY(user_id)
REFERENCES user(id));

