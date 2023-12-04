const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    contactName:{
        type:String
    },

    contactEmail:{
        type:String
    },

    contactMessage:{
        type:Array
    }


}, {timestamps:true});

const ContactModel = mongoose.model('contact', contactSchema);
module.exports = ContactModel;