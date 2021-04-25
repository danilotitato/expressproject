const express = require('express');
const router = express.Router();
const Word = require('../model/word.js')

router.get('/random', (req, res, next) => {
    Word.aggregate( [{ $sample: {size:1} }] ).then(word => {
        console.log(word);
        res.send(word);
    }).catch(next);
});

router.get('/search', (req, res) => {
    query = req.query.query;
    console.log(query);

    Word.findOne({word: query}).then(query => {
        if (!query) {
            console.log("not found!");
            res.status(404).send("not found!");
        } else {
            console.log("found!");
            res.send(query);
        }
    });
});

module.exports = router;
