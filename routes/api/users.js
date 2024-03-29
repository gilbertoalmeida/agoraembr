const express = require("express");
const router = express.Router();

//Bringing User and Article Models
const User = require("../../models/User");

// @route   GET api/users/:id
// @desc    Get one user by its id
// @access  Public
router.get("/:id", async (req, res) => {
  let query = { _id: req.params.id };
  try {
    const user = await User.findOne(query, { password: 0 });

    if (!user) {
      return res.status(404);
    }

    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
