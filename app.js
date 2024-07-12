const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const mysql = require("mysql");

app.use(bodyParser());

app.get("/watch", (req, res) => {
  res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Registration Form</title>
      </head>
      <body>
        <h1>Register</h1>
        <form action="/register" method="POST">
          <label for="username">Username:</label><br>
          <input type="text" id="username" name="username"><br><br>
          <label for="email">Email:</label><br>
          <input type="email" id="email" name="email"><br><br>
          <label for="password">Password:</label><br>
          <input type="password" id="password" name="password"><br><br>
          <input type="submit" value="Register">
        </form>
      </body>
    </html>
`);
});

app.post("/register", (req, res) => {
  console.log(req.body);

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs",
  });

  connection.connect();

  connection.query("SELECT * from users", function (error, results, fields) {
    if (error) throw error;
    console.log("The solution is: ", results);
    res.send(results);
  });

  connection.end();
});

// app.post()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
