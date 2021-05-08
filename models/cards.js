const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    card_details: {
        type : [Number]
    },
    game : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'GameSchema'
    }
},{
    timestamps : true
});

const CardSchema = mongoose.model('CardSchema',cardSchema);
module.exports = CardSchema;