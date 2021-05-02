require('log-timestamp');
const express = require('express');
const mongoose = require('mongoose');
const loadCsv = require('./util/loadCsv.js');

const mongoURI = 'mongodb://127.0.0.1/vocabulary';

mongoose
    .connect(mongoURI, {useNewUrlParser:true, useUnifiedTopology:true}, (err, db) => {
        if (err) {
            console.log("app init - db connecting: " + err);
            return;
        }

        if (!loadCsv()) {
            console.log("app init - csv load");
            return;
        }

        startApp();
    });


const startApp = () => {
    const app = express();
    const port = process.env.HTTP_PORT || 3000;

    app.use(express.json());
    app.use('/api', require('./route/route.js'));

    app.listen(port, () => {
        console.log('Server listening on port ' + port);
    })
}