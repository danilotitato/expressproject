const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.HTTP_PORT || 3000;

let mongoDB = 'mongodb://127.0.0.1/vocab';
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true});

app.use(express.json());
app.use('/api', require('./route/route.js'));

app.listen(port, () => {
    console.log('Server listening on port ' + port);
})
