const express = require('express');
const session = require("express-session");
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const credentialFile = require('./credential');
const { env } = require('process');
const port = env.PORT || 4000;
const salt = credentialFile.salt;
//backend first then frontend
var corsOptions = {
  origin : "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

db = new sqlite3.Database('./images.db', sqlite3.OPEN_READWRITE, (err) => {
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

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  session({
    //hide the secret key
    secret: "key that will sign cookie",
    resave: false, 
    saveUninitialized: false,
    cookie: {
      secure: false
    }
  })
);

app.all(["/images"], (req,res, next) => {
  if(req.session.userId){
    next(); 
  }else{
     res.status(302).send({url: "http://localhost:3000/login"});
   }
 })

app.get('/images', async (req, res) => {
  console.log(req.session);
  let cursor = req.query.imgId ? req.query.imgId : 0;
  let searchQuery = req.query.searchQuery ? req.query.searchQuery : '';
  let numImages = 20;
  let images = await getImages(cursor, numImages, searchQuery);
  if (!cursor) {
    res.send(images);
  } else {
    res.send(images);
  }
});
/**
 * Why isn't my cookie staying constant?
 */

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.get(`SELECT id, password FROM users WHERE email = ?;`, username, (err, user) => {
    if(user) {
      bcrypt.compare(password, user.password, (error, response) => {
        if(response) {
          console.log('Password is equal');
          req.session.userId = user.id;
          req.session.cookie.maxAge = 60*1000*60*24*7;
          console.log(`user id: ${user.id}`);
          res.send({ message: "Login successful"});
        } else {
          console.log('Password is wrong');
          res.status(401).send({ message: "Wrong password for username" });
        }
      })
    } else {
      res.status(401).send({ message: "User does not exist" });
    }
  });

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
  db.run(addUser, [req.body.email, hash, req.body.name]);
    console.log('user created');
    /**
     * if(req.body.email == req.body.confEmail && req.body.password == req.body.confPassword && req.body.name != null) {
    res.send({isValid: true})
    db.run(addUser, [req.body.email, hash, req.body.name]);
    console.log('user created');
  } else {
    res.send({isValid: false})
  }
     */
    //add validation checks
  //is email == confEmail
  /**
   * when you return the error, the client side should have red boxes
   * saying "password or email is not the same"
   * involving more state because you might have an errors thing in response
   * check error state, know which box is error by the label
   */
  
});

if(!env.TEST) {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}
