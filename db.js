const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/persons"

const mongoToConnect = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Mongo Connected");
    })
}

module.exports = mongoToConnect