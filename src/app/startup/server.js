const express = require('express');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
var cors = require('cors');
var bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.options('*', cors());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

const ControllerApi = require('./server/controller');

app.use('/api', ControllerApi);

app.use(function (err, req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    if (err.return) {
        res.json(err);
    } else {
        console.error(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
    next();
})


const port = process.env.PORT || '8200';
app.set('port', port);
app.set('host', '127.0.0.1');

const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on 127.0.0.1:${port}`));