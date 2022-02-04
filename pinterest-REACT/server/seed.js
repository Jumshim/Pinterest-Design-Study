const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('images.db');

db.run('CREATE TABLE images (img_id INTEGER PRIMARY KEY, title, description, URL NOT NULL');

let imgLinks = [];
