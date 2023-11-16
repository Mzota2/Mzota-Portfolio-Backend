const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    contactLocation:{
        type:String
    },

    contactEmail:{
        type:String
    },

    contactPhone:{
        type:String
    },
});

const ContactInfoModel = mongoose.model('contactInfo', contactSchema);
module.exports = ContactInfoModel;