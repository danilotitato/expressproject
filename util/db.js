const Word = require('../model/word.js');

const createNewEntryFromCsv = doc => {
    const newEntry = new Word({
        word: doc[0],
        def: doc.slice(1).join(", ")
    });

    return newEntry;
}

const addUnique = newEntry => {
    Word.findOne({word: newEntry.word}).then(query => {
        if (!query) {
            newEntry.save((err, newEntry) => {
                if (err) {
                    console.log("addUniqueInDb: " + err);
                    return;
                }
                console.log("addUniqueInDb: " + newEntry.word + " saved");
            });
        } else {
            console.log("addUniqueInDb: " + newEntry.word + " already on db!");
        }
    });
}


module.exports = {createNewEntryFromCsv, addUnique};