require('log-timestamp');
const express = require('express');
const router = express.Router();
const Word = require('../model/word.js')
const isValidStringInput = require('../util/validateInput.js').isValidStringInput;
const {addUnique} = require('../util/db.js');

router.get('/random', (req, res) => {
    Word.aggregate( [{ $sample: {size:1} }] ).then(randomWord => {
        console.log("random");
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
    const newEntry = new Word({
        word: req.body.word,
        def: req.body.def,
    });

    console.log("addword: " + newEntry);

    if (!isValidStringInput(newEntry.word) || !isValidStringInput(newEntry.def)) {
        console.log("addword: Invalid word/definition");
        res.status(400).send("Invalid word/definition");
        return;
    }

    if (!addUnique(newEntry)) {
        console.log("addword: adding to db failed");
        res.status(500).send("A server error occurred");
        return;
    }

    res.send(newEntry.word + " received!");
});

module.exports = router;
