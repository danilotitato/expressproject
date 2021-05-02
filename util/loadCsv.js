const csv = require('fast-csv');
const Word = require('../model/word.js');
const {createNewEntryFromCsv, addUnique} = require('./db.js');

const loadCsv = () => {
    csv.parseFile('Vocabulary_set.csv')
        .on("data", doc => {
            const newEntry = createNewEntryFromCsv(doc);

            if (!addUnique(newEntry)) {
                return false;
            }
        });

    return true;
}

module.exports = loadCsv;