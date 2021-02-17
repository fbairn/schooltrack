var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var tasks = require('./routes/tasks');

var app = express();

var corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'timetrack')));

app.use('/api/v1/tasks', tasks);

app.get('/health', (req, res) => {
    console.log('Health Req');
    res.json({ status: 'OK', online: true });
});

app.get('*', (req, res) => {
    console.log('Genric Req');
    res.sendFile(path.join(__dirname, 'timetrack/index.html'));
});

console.log('Starting something amazing...');
module.exports = app;
