const mongoose = require("mongoose");

let journalSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  history: {
    firstYear: {
      type: String
    },
    lastYear: {
      type: String
    },
    active: {
      type: Boolean
    }
  },
  publisher: {
    type: String
  },
  topicID: {
    type: String,
    required: true
  },
  issn: {
    print: {
      type: String
    },
    online: {
      type: String
    }
  },
  impactFactor: {
    type: Object
  }
});

let Journal = (module.exports = mongoose.model("Journal", journalSchema));
/* The first argument is the singular name of the collection your model is for. 
** Mongoose automatically looks for the plural, lowercased version of your model name. ** 
Thus, for the example above, the model Journal is for the journals collection in the database. */
