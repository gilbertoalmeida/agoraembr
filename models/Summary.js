const mongoose = require("mongoose");

let summarySchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  articleID: {
    type: String,
    required: true
  },
  topicID: {
    type: String,
    required: true
  },
  posted: {
    type: Date,
    default: Date.now
  },
  authorID: {
    type: String,
    required: true
  },
  revisersIDs: {
    type: Array
  },
  text: {
    type: String,
    required: true
  }
});

let Summary = (module.exports = mongoose.model("Summary", summarySchema));
/* The first argument is the singular name of the collection your model is for. 
** Mongoose automatically looks for the plural, lowercased version of your model name. ** 
Thus, for the example above, the model Journal is for the journals collection in the database. */
