const mongoose = require("mongoose");

let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  doi: {
    type: String,
    required: true
  },
  linkPublication: {
    type: Object,
    required: true
  },
  journalID: {
    type: Object,
    required: true
  }
});

let Article = (module.exports = mongoose.model("Article", articleSchema));
/* The first argument is the singular name of the collection your model is for. 
** Mongoose automatically looks for the plural, lowercased version of your model name. ** 
Thus, for the example above, the model Article is for the articles collection in the database. */
