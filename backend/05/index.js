const mongoose = require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect("mongodb+srv://eren-sonmez-dev:asbe2002@myatlasclusteredu.lx5m2.mongodb.net/university?retryWrites=true&w=majority&appName=myAtlasClusterEDU");
        console.log("MongoDB is connected");
    }catch (err){
        console.error("Connection failed to MongoDB", err);
    }
}

module.exports = { connectDB };