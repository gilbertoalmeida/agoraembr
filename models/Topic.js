const mongoose = require("mongoose");

let topicSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coverPic: {
    url: {
      type: String,
      required: true
    },
    license: {
      type: {
        type: String,
        required: true
      },
      source: {
        type: String
      }
    }
  }
});

let Topic = (module.exports = mongoose.model("Topic", topicSchema));
/* The first argument is the singular name of the collection your model is for. 
** Mongoose automatically looks for the plural, lowercased version of your model name. ** 
Thus, for the example above, the model Topic is for the topics collection in the database. */
