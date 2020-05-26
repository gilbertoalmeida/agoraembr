const express = require("express");
const router = express.Router();

//Bringing Model
const Journal = require("../../models/Journal");

// @route   GET api/journals/:id
// @desc    Get one journal by its id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404);
    }

    res.json(journal);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
