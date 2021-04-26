require('log-timestamp');
const express = require('express');
const router = express.Router();
const Word = require('../model/word.js')

const validateInput = require('../util/validateInput.js')
const isValidStringInput = validateInput.isValidStringInput;

router.get('/random', (req, res) => {
    Word.aggregate( [{ $sample: {size:1} }] ).then(randomWord => {
        console.log("random query");
        res.send(randomWord);
    });
});

router.get('/search', (req, res) => {
    query = req.query.query;

    if (!isValidStringInput(query)) {
        console.log("search: Invalid query");
        res.status(400).send("Invalid query");
        return;
    }

    console.log("search: requested "+ query);

    Word.findOne({word: query}).then(query => {
        if (!query) {
            console.log("search: not found!");
            res.status(404).send("not found!");
            return;
        }

        console.log("search: " + query.word + " found!");
        res.send(query);
    });
});

router.post("/addword", (req, res) => {
    const postedWord = new Word({
        word: req.body.word,
        def: req.body.def,
    });

    if (!isValidStringInput(postedWord.word) || !isValidStringInput(postedWord.def)) {
        console.log("addword: Invalid word/definition");
        res.status(400).send("Invalid word/definition");
        return;
    }

    console.log(postedWord);

    Word.findOne({word: postedWord.word}).then(query => {
        if (!query) {
            postedWord.save((err, postedWord) => {
                if (err) {
                    console.log("addword: " + err);
                    res.status(500).send("An server error occurred: " + err);
                    return;
                }
                console.log(postedWord.word + " saved");
                res.send(postedWord.word + " saved");
            });
            return;
        } else {
            console.log("addword: " + postedWord.word + " already on db!");
            res.send();
        }
    });
});

module.exports = router;
