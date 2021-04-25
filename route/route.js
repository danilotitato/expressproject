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
            console.log(query.word + " found!");
            res.send(query);
        }
    });
});

router.post("/addword", (req, res) => {
    const postedWord = new Word({
        word: req.body.word,
        def: req.body.def,
    });

    console.log(postedWord);

    postedWord.save((err, postedWord) => {
        if (err) {
            console.log("addword: " + err);
            res.status(500).send("An server error occurred: " + err);
        }
        console.log(postedWord.word + " saved");
        res.send(postedWord.word + " saved");
    });
})

module.exports = router;
