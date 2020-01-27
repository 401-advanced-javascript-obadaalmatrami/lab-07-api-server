'use strict';

const express = require('express');
const app = express();
const logRequest = require('../logger/logger.js')

app.use(express.json())
app.use(logRequest)

function logger(req, res, next) {

    console.log('Time-now', req.requestTime);
    console.log('Path', req.path);
    console.log('Method', req.method);
    next();

}


function notFoundHandler(req, res, next) {
    res.status(404);
    res.statusMessage = 'Resource Not Found';
    res.json({ error: 'Not Found' });
}

function errorHandler(err, req, res, next) {
    res.status(500);
    res.statusMessage = 'Server Error';
    res.json({ error: err });
}


let db = [];

app.get('/api/v1/products', (req, res, next) => {
    let count = db.length;
    let results = db;
    res.json({ count, results });
});

app.get('/api/v1/products/:_id', (req, res, next) => {
    let id = req.params.id;
    let record = db.filter((record) => record.id === parseInt(id));
    res.json(record[0]);
});


app.post('/api/v1/products/:_id', (req, res, next) => {
    let { name } = req.body;
    let record = { name };
    record.id = db.length + 1;
    db.push(record);
    res.json(record);
});

app.put('/api/v1/products/:_id', (req, res, next) => {
    let idToUpdate = req.params.id;
    let { name, id } = req.body;
    let updatedRecord = { name, id };
    db = db.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
    res.json(updatedRecord);
});

app.delete('/api/v1/products/:_id', (req, res, next) => {
    let id = req.params.id;
    db = db.filter((record) => record.id !== parseInt(id));
    res.json({});
});

let dbb = [];

app.get('/api/v1/categories', (req, res, next) => {
    let count = dbb.length;
    let results = dbb;
    res.json({ count, results });
});

app.get('/api/v1/categories/:_id', (req, res, next) => {
    let id = req.params.id;
    let record = dbb.filter((record) => record.id === parseInt(id));
    res.json(record[0]);
});


app.post('/api/v1/categories/:_id', (req, res, next) => {
    let { name } = req.body;
    let record = { name };
    record.id = dbb.length + 1;
    dbb.push(record);
    res.json(record);
});

app.put('/api/v1/categories/:_id', (req, res, next) => {
    let idToUpdate = req.params.id;
    let { name, id } = req.body;
    let updatedRecord = { name, id };
    dbb = dbb.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
    res.json(updatedRecord);
});

app.delete('/api/v1/categories/:_id', (req, res, next) => {
    let id = req.params.id;
    dbb = dbb.filter((record) => record.id !== parseInt(id));
    res.json({});
});



function Timestamp(req, res, next) {
    req.requestTime = Date.now();
    next();
}

app.use('*', Timestamp);
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    },
};