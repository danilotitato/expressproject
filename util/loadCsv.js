const csv = require('fast-csv');
const Word = require('../model/word.js');

const loadCsv = () => {
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
                            return false;
                        }
                        console.log(newWord.word + " added");
                    });
                } else {
                    console.log("addword: " + newWord.word + " already on db!");
                }
            });
        });
        return true;
}

module.exports = loadCsv;