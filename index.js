const express = require('express');
const bodyParser = require('body-parser');
const task = require('./models/task');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

var urlendodedParser = bodyParser.urlencoded({extended: false});

task(app);
app.listen(3000, () => {
    console.log('listening on a port 3000');
});