const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth"); //middleware to protect routes

//Bringing User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public

router.post("/register", async (req, res) => {
  const { completeName, email, password, cvSummary } = req.body;

  if (!completeName || !email || !password) {
    return res.status(400).json({
      msg: "missing_register_fields" //this is now not the error message itself, but part of the id of the translation
    });
  }

  try {
    //checking if email exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "existing_email" });
    }

    const newUser = new User({ completeName, email, password, cvSummary });

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    jwt.sign(
      { _id: newUser._id }, // payload. I am sending the user id to verify actions later
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token: token,
          _id: newUser._id,
          completeName: newUser.completeName,
          email: newUser.email
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: "server_error"
    });
  }
});

// @route   POST api/auth
// @desc    Authenticate the user
// @access  Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  //Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "missing_credentials" }); //this is now not the error message itself, but part of the id of the translation
  }

  try {
    //checking if email exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ msg: "wrong_credentials" });
    }

    //Validade the password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "wrong_credentials" });
    }

    jwt.sign(
      { _id: existingUser._id }, // payload. I am sending the user id to verify actions later
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token: token,
          _id: existingUser._id,
          completeName: existingUser.completeName,
          email: existingUser.email
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: "server_error"
    });
  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.find(
    { _id: req.user._id },
    { cvSummary: 0, registerDate: 0, password: 0, __v: 0 }
  ).then(user => res.json(user[0]));
});

// @route    PATCH api/users/edit
// @desc     Update user profile
// @access   Private

router.patch("/edit", auth, async (req, res) => {
  const { id, username, profilePicsArray } = req.body;

  if (!username) {
    return res.status(400).json({
      msg: "missing_username" //this is now not the error message itself, but part of the id of the translation
    });
  }

  //removing everything that isn't a letter, number or . or _
  // then trimming white spaces
  usernameEdited = username
    .replace(/[^a-zA-Z0-9_.]/gi, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  if (usernameEdited.length > 30) {
    return res.status(400).json({
      msg: "big_username"
    });
  }

  //check if the username exists
  try {
    let existingUser = await User.findOne({ username: usernameEdited });
    if (existingUser && existingUser._id != id) {
      return res.status(400).json({ msg: "existing_username" }); //check if its safe to say whats in the translation file
    }
    try {
      //Profile Object
      const profileFields = {
        username: usernameEdited,
        profile_pictures: profilePicsArray
      };

      let foundAndEditedProfile = await User.findOneAndUpdate(
        { _id: id },
        profileFields,
        { new: true, useFindAndModify: false }
      );
      res.json(foundAndEditedProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: "server_error"
    });
  }
});

module.exports = router;
