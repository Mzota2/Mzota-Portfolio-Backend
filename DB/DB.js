const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect(process.env.MONGODB_URL, {}).then(res =>{
        console.log('Connected to MzotaPortfolio DB Successfully')
    }).catch((error)=>{
        console.log(error.message)
    })
}

module.exports = connectDB;