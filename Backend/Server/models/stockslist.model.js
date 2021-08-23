const mongoose = require('mongoose');

const Schema = mongoose.Schema;


 //all the information going to store
const stocklistSchema = new Schema({
    list: { 
        type: Array, 
        required: true
},

});

 const Stocklist = mongoose.model('Stocklist', stocklistSchema);

 module.exports = Stocklist;
