const express = require('express');
const router = express.Router();
const Word = require('../model/word.js')

router.get('/random', (req, res) => {
    Word.aggregate( [{ $sample: {size:1} }] ).then(randomWord => {
        res.send(randomWord);
    });
});

router.get('/search', (req, res) => {
    query = req.query.query;

    if (!query || !(typeof query === 'string' || query instanceof String)) {
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
        } else {
            console.log("search: " + query.word + " found!");
            res.send(query);
        }
    });
});

router.post("/addword", (req, res) => {
    const postedWord = new Word({
        word: req.body.word,
        def: req.body.def,
    });

    if (!(typeof postedWord.word === 'string' || postedWord.word instanceof String)
            || !(typeof postedWord.def === 'string' || postedWord.def instanceof String)) {
        console.log("addword: Invalid request");
        res.status(400).send("Invalid request");
        return;
    } else if (!postedWord.word || !postedWord.def) {
        console.log("addword: Incomplete request");
        res.status(400).send("Incomplete request, needs word and def");
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
