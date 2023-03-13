const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connect Database success!!")
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;