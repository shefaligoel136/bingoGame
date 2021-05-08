const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    card : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'CardSchema'
        }
    ],
},{
    timestamps : true
});

const PlayerSchema = mongoose.model('PlayerSchema',playerSchema);
module.exports = PlayerSchema;