const express = require('express');
const path = require('path');
const app = express();
const port = 2000;

app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
})