const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  completeName: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cvSummary: {
    type: String
  },
  profilePic: {
    type: String
  }
});

let User = (module.exports = mongoose.model("User", userSchema));
/* The first argument is the singular name of the collection your model is for. 
** Mongoose automatically looks for the plural, lowercased version of your model name. ** 
Thus, for the example above, the model User is for the users collection in the database. */
