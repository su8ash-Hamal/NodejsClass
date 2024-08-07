const mongoose = require("mongoose");

const Rat = mongoose.model("Rat", {
  name: {
    type: String,
    minLength: [3, "Invalid name, Name must be atleast 3"],
  },
  legs: {
    type: Number,
    min: [0, "Cant be in negetive"],
    required: true,
    max: [9, "Cat has nine lifes so cant be more than 9 legs"],
  },
  eaten: {
    type: Boolean,
    default: false,
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rat",
    default: null,
  },
});

module.exports = Rat;
