const express = require("express");
const router = express.Router();

//Bringing Model
const Summary = require("../../models/Summary");

// @route   GET api/articles/:id
// @desc    Get one summary by its id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const summary = await Summary.findById(req.params.id);

    if (!summary) {
      return res.status(404);
    }

    res.json(summary);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
