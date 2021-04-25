const express = require('express');
const router = express.Router();
const Word = require('../model/word.js')

router.get('/word', (req, res, next) => {
    Word.aggregate( [{ $sample: {size:1} }] ).then (function(word) {
        console.log(word);
        res.send(word);
    }).catch(next);
});

module.exports = router;
