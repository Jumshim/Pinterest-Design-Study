const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 4000;

//backend first then frontend
/**
 * if i were to search images, it would cause a change in a state
 * Backend Search
 * Frontend Search
 */

let db = new sqlite3.Database('images.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) {
        return console.error(err.message);
    }
    console.log('Connected to SQL Database!');
});

function getImages(cursor, numImages) {
    let selectURLs = `SELECT img_id, URL FROM images WHERE img_id>? ORDER BY img_id ASC LIMIT ?`;
    let data = [];
    return new Promise(resolve => {
        db.all(selectURLs, [cursor, numImages], (err, rows) => {
            if(err) { throw err };
            rows.forEach((row => {
                data.push(row);
            }))
            resolve(data);
        })
    })
}

app.use(cors());

app.get('/images', async (req, res) => {
    let cursor = req.query.imgId ? req.query.imgId : 0;
    let numImages = 20;
    let images = await getImages(cursor, numImages);
    //conditions are unique column and has some order
    //imgLinks = [...imgLinks, ...imgLinks, ...imgLinks];
    if(!cursor){
        res.send(images);
    } else {
        res.send(images);
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

