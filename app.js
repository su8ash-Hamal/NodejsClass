const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// replace process.env.DB_URL with your DB Url
// Go to MongoDB cloud then go to database the go to connect ang then go to compass. There you find a url with mongodb+srv://<username>:<password>@testcluster.pnaf28h.mongodb.net/
// replace username with your username and password with your password
// text after @ could vary.
mongoose
  .connect(process.env.DB_URL)
  .then((data) => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log(err);

    console.log("Error during connection ");
  });

const cats = require("./controller/cat");

app.use("/api", cats);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error during connection");
  }
  console.log("Server on http://localhost:" + process.env.PORT);
});

// kitty.save().then(() => console.log("meow"));
