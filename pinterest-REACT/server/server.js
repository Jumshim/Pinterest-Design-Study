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

function getImages() {
    let data = [];
    return new Promise(resolve => {
        db.all(`SELECT URL FROM images`, [], (err, rows) => {
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
    let pageOffset = req.query.tagID;
    let numImages = 20;
    let imgLinks = await getImages();
    imgLinks = [...imgLinks, ...imgLinks, ...imgLinks, ...imgLinks, ...imgLinks];
    imgLinks = [...imgLinks, ...imgLinks, ...imgLinks, ...imgLinks];
    if(!pageOffset){
        res.send(imgLinks.slice(0, 20));
    } else {
        res.send(imgLinks.slice(pageOffset * numImages, (pageOffset * numImages) + numImages));
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

