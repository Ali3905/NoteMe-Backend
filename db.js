const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://muhammadali30905:aliahmed3905@noteme.7lqbkgb.mongodb.net/NoteMe?retryWrites=true&w=majority"

const mongoToConnect = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Mongo Connected");
    })
}

module.exports = mongoToConnect