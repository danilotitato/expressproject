const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema(
    {
        word:{
            type:String,
            required:[true, "Word Required"]
        },
        def: {
            type:String,
            required:[true, "Definition Required"]
        }
    }
);

const Word = mongoose.model('word', WordSchema, 'word');
module.exports = Word;
