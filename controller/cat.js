const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const Cat = mongoose.model("Rat", { name: String, legs: Number });

router.get("/cats", async (req, res) => {
  const catsFromDB = await Cat.find();
  res.send(catsFromDB);
});

router.post("/cats", (req, res) => {
  const body = req.body;

  const kitty = new Cat({ name: body.name, legs: body.leg });
  console.log(kitty);

  kitty
    .save()
    .then(() => {
      res.send("Kitty Saved to DB");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Error found");
    });
});

module.exports = router;
