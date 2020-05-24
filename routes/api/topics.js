const express = require("express");
const router = express.Router();

//Bringing Model
const Topic = require("../../models/Topic");

// @route   GET api/topics/:id
// @desc    Get one topic by its id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404);
    }

    res.json(topic);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
