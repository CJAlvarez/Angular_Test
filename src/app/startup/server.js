const express = require('express');
const path = require('path');
const http = require('http');
var cors = require('cors');
var bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

const ControllerApi = require('./server/controller');

app.use('/api', ControllerApi);

app.use(function(err, req, res, next) {
    if (err.return) {
        res.json(err);
    } else {
        console.error(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
})


const port = process.env.PORT || '8200';
app.set('port', port);
app.set('host', '127.0.0.1');

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on 127.0.0.1:${port}`));