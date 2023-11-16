const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    hello:{
        type:String
    },

    description:{
        type:String
    },

    profileImage:{
        type:String
    }


});

const HomeModel = mongoose.model('home', homeSchema);
module.exports = HomeModel;