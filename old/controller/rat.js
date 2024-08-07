const express = require("express");
const Rat = require("../model/rat");
const router = express.Router();

// Create a new Rat
router.post("/", async (req, res) => {
  try {
    const newRat = new Rat(req.body);
    await newRat.save();
    res.status(201).send(newRat);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Read all Rats
router.get("/", async (req, res) => {
  try {
    const rats = await Rat.find().populate("partner");
    res.status(200).send(rats);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Read a specific Rat by ID
router.get("/:id", async (req, res) => {
  try {
    const rat = await Rat.findById(req.params.id);
    if (!rat) {
      return res.status(404).send("Rat not found");
    }
    res.status(200).send(rat);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a specific Rat by ID
router.put("/:id", async (req, res) => {
  try {
    // Find the rat with the current partner details
    const rat = await Rat.findById(req.params.id).populate("partner");

    if (!rat) {
      return res.status(404).send("Rat not found");
    }

    // Check if the partner can be updated
    if (req.body.partner) {
      if (rat.partner && !rat.partner.eaten) {
        return res
          .status(400)
          .send("Cannot update partner if current partner is not eaten");
      }
    }

    // Update the rat's data
    Object.assign(rat, req.body);
    await rat.save();

    res.status(200).send(rat);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete a specific Rat by ID
router.delete("/:id", async (req, res) => {
  try {
    const rat = await Rat.findByIdAndDelete(req.params.id);
    if (!rat) {
      return res.status(404).send("Rat not found");
    }
    res.status(200).send("Rat deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
