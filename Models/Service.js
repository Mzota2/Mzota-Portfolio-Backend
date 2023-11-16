const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    serviceTitle:{
        type:String
    },

    serviceDescription:{
        type:String
    },
});

const ServiceModel = mongoose.model('service', serviceSchema);
module.exports = ServiceModel;