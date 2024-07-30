const express = require("express");
const Cat = require("../model/cat");
const Rat = require("../model/rat");
const router = express.Router();

router.get("/", async (req, res) => {
  const catsFromDB = await Cat.find();
  res.send(catsFromDB);
});

router.post("/", (req, res) => {
  const body = req.body;

  const kitty = new Cat({ name: body.name, legs: body.legs });
  console.log(kitty);

  kitty
    .save()
    .then(() => {
      res.send("Kitty Saved to DB");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message);
    });
});

// Update a specific Cat by ID to eat multiple rats
router.put("/:id/eatRats", async (req, res) => {
  try {
    const catId = req.params.id;
    const ratIds = req.body.rats;

    const cat = await Cat.findById(catId);
    if (!cat) {
      return res.status(404).send("Cat not found");
    }

    console.log(ratIds);

    const validRats = await Rat.find({ _id: { $in: ratIds }, eaten: false });
    const validRatIds = validRats.map((rat) => rat._id);

    console.log(validRatIds);

    cat.ratsEaten.push(...validRatIds);
    await cat.save();

    await Rat.updateMany(
      { _id: { $in: validRatIds } },
      { $set: { eaten: true } }
    );

    res.status(200).send(cat);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
