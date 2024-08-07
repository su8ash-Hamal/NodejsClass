const mongoose = require("mongoose");

const Cat = mongoose.model("Cat", {
  name: {
    type: String,
    minLength: 2,
  },
  legs: {
    type: Number,
    required: true,
    min: 3,
  },
  ratsEaten: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rat" }],
});

module.exports = Cat;
