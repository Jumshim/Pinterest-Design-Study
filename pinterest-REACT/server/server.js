const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 4000;

//backend first then frontend

let db = new sqlite3.Database('images.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) {
        return console.error(err.message);
    }
    console.log('Connected to SQL Database!');
});

function getImages(cursor, numImages, searchQuery) {
    let selectURLs = `SELECT img_id, URL FROM images WHERE img_id>? AND (title LIKE '%${searchQuery}%' OR description LIKE '%${searchQuery}%') ORDER BY img_id ASC LIMIT ?`;
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
    let searchQuery = req.query.searchQuery ? req.query.searchQuery : '';
    let numImages = 20;
    let images = await getImages(cursor, numImages, searchQuery);
    //conditions are unique column and has some order
    //imgLinks = [...imgLinks, ...imgLinks, ...imgLinks];
    if(!cursor){
        res.send(images);
    } else {
        res.send(images);
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

