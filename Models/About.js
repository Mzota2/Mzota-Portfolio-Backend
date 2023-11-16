const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    description:{
        type:String
    },
    resume:{
        type:String
    }

});

const AboutModel = mongoose.model('about', aboutSchema);
module.exports = AboutModel;