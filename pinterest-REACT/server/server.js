const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const port = 4000;
const credentialFile = require('./credential');
const salt = bcrypt.genSaltSync(credentialFile.saltRounds);
//backend first then frontend

let db = new sqlite3.Database('images.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to SQL Database!');
});

function getImages(cursor, numImages, searchQuery) {
  let selectURLs = `SELECT img_id, URL FROM images WHERE img_id>? AND (title LIKE '%${searchQuery}%' OR description LIKE '%${searchQuery}%') ORDER BY img_id ASC LIMIT ?`;
  let data = [];
  return new Promise((resolve) => {
    db.all(selectURLs, [cursor, numImages], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        data.push(row);
      });
      resolve(data);
    });
  });
}

app.use(cors());
app.use(express.json());

app.get('/images', async (req, res) => {
  let cursor = req.query.imgId ? req.query.imgId : 0;
  let searchQuery = req.query.searchQuery ? req.query.searchQuery : '';
  let numImages = 20;
  let images = await getImages(cursor, numImages, searchQuery);
  //conditions are unique column and has some order
  //imgLinks = [...imgLinks, ...imgLinks, ...imgLinks];
  if (!cursor) {
    res.send(images);
  } else {
    res.send(images);
  }
});

app.post('/login', (req, res) => {
  res.json(req.body);
  console.log(req.body);
  console.log(req);
});

//protected Routes
//send cookie, expiration date. that's how u know you're logged in
// cookie has decoded hash and has information on the user that allows you to
// access any page. if hash is false, then a redirect is sent

app.post('/signup', (req, res) => {
  res.json(req.body);
  let password = req.body.password;
  let hash = bcrypt.hashSync(password, salt);
  let addUser = `INSERT OR IGNORE INTO users(email, password, name) VALUES (?, ?, ?)`;
  //add validation checks
  //is email == confEmail
  /**
   * when you return the error, the client side should have red boxes
   * saying "password or email is not the same"
   * involving more state because you might have an errors thing in response
   * check error state, know which box is error by the label
   */
  db.run(addUser, [req.body.email, hash, req.body.name]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
