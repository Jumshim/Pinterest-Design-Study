const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('images.db');

const {getDefaultNormalizer} = require('@testing-library/react');
let images = require('./images.json');

//change img_id to id

let createImgTable =
  'CREATE TABLE IF NOT EXISTS images (img_id INTEGER PRIMARY KEY, title, description, URL NOT NULL, UNIQUE(URL))';
let insertImages = `INSERT OR IGNORE INTO images(title, description, URL) VALUES (?, ?, ?)`;

let createUserTable =
  'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email UNIQUE NOT NULL, password NOT NULL, name NOT NULL)';

let insertUser = `INSERT OR IGNORE INTO users(email, password, name) VALUES (?, ?, ?)`;

db.serialize(() => {
  db.run(createImgTable);
  images.forEach((img) => {
    db.run(insertImages, [img.title, img.description, img.URL]);
  });

  db.run(createUserTable);
  db.run(insertUser, ['onlyforbrawlstara@.com', 'hi', 'Jeffrey Mun']);
});

db.close();
