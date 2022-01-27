const express = require('express');
const path = require('path');
const app = express();
const port = 2000;

app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname) + "/views"));
app.set('views', path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/temp', function(req, res) {
    console.log('Request for temp page received');
    res.render('temp.html');
})

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
})

