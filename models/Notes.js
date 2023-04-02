const mongoose = require('mongoose')
const Schema  = mongoose.Schema;

const noteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String
    },
    description: {
        type: String,
    },
    tag: {
        type: String,
    }
  });

  module.exports = mongoose.model('note', noteSchema)