const express = require('express');
const csv = require('fast-csv');
const mongoose = require('mongoose');
const Word = require('./model/word.js')

const mongoURI = 'mongodb://127.0.0.1/vocabulary';

mongoose.connect(mongoURI, {useNewUrlParser:true, useUnifiedTopology:true}, (err, db) => {
        if (err) {
            console.log("app init - db connecting: " + err);
            return;
        }

        const app = express();
        const port = process.env.HTTP_PORT || 3000;

        let headers = Object.keys(Word.schema.paths)
            .filter(k => ['_id','__v'].indexOf(k) === -1);

        csv.parseFile('Vocabulary_set.csv')
            .on("data", doc => {
                const newWord = new Word({
                    word: doc[0],
                    def: doc[1]
                });

                Word.findOne({word: newWord.word}).then(query => {
                    if (!query) {
                        newWord.save((err, newWord) => {
                            if (err) {
                                console.log("app init - updating: " + err);
                                return;
                            }
                            console.log(newWord.word + " added");
                            return;
                        });
                        return;
                    } else {
                        console.log("addword: " + newWord.word + " already on db!");
                    }
                });
            });

        app.use(express.json());
        app.use('/api', require('./route/route.js'));

        app.listen(port, () => {
            console.log('Server listening on port ' + port);
        })
    });
