const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('images.db');

const images = require('./images.json');

let createTable = 'CREATE TABLE images (img_id INTEGER PRIMARY KEY, title, description, URL NOT NULL)';
let insertImages = `INSERT INTO images(title, description, URL) VALUES (?, ?, ?)`;


db.serialize(() => {
    db.run(createTable);
    images.forEach(img => {
        db.run(insertImages, [img.title, img.description, img.URL]);
    });
})


db.close();