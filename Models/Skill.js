const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skillTitle:{
        type:String
    },

    skillRating:{
        type:Number
    }


});

const SkillModel = mongoose.model('skill', skillSchema);
module.exports = SkillModel;