const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 4000;

//backend first then frontend
/**
 * Learn machine learning???
 * suggestions in searchbar
 */

let db = new sqlite3.Database('images.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) {
        return console.error(err.message);
    }
    console.log('Connected to SQL Database!');
});

//Just add a thing for get images where you receive a parameter
//where user_id = param
//pass in page * numImages

function getImages(cursor, numImages) {
    let data = [];
    return new Promise(resolve => {
        db.all(`SELECT URL FROM images WHERE img_id>? LIMIT ?`, [cursor, numImages], (err, rows) => {
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
    let cursor = req.query.tagID;
    let numImages = 10;
    let imgLinks = await getImages(cursor*numImages, numImages);
    imgLinks = [...imgLinks, ...imgLinks, ...imgLinks, ...imgLinks, ...imgLinks];
    imgLinks = [...imgLinks, ...imgLinks, ...imgLinks, ...imgLinks];
    if(!cursor){
        res.send(imgLinks.slice(0, numImages));
    } else {
        res.send(imgLinks.slice(cursor, cursor + numImages));
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

