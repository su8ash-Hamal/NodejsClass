const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;
const upload = require("./multerConfig");
const ErrorHandler = require("./middleware/ErrorHandler");
const AsyncHandler = require("./middleware/AsyncHandler");

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Database connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Limit of using connection
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs",
});

const myLogger = function (req, res, next) {
  if (req.url === "/login") {
    res.send("No Thank you");
  }
  next();
};

app.use(myLogger);

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
  const body = req.body;
  // Checks the connection (this is first connection +1)
  pool.getConnection((err, connection) => {
    // if connection not found
    if (err) {
      console.error("Error getting a connection from the pool:", err);
      res.status(400).send({
        success: false,
        error: err,
      });
      return;
    }

    // if connection is avaIlable
    connection.query(
      `SELECT * FROM users WHERE email=?`,
      [body.email],
      (error, results) => {
        // If any error occurs when using the query
        if (error) {
          console.error("Error querying the database:", error);
          res.status(400).send({
            success: false,
            error: error,
          });
          connection.release(); // Release the connection back to the pool (-1)
          return;
        }

        // if no user with the email is found
        if (results.length > 0) {
          res.status(400).send({
            success: false,
            error: "Given email is already in use.",
          });
          connection.release(); // Release the connection back to the pool (-1)
        } else {
          connection.query(
            `INSERT INTO users (name, nickname, email, password) VALUES (?, ?, ?, ?)`,
            [body.name, body.nickname, body.email, body.password],
            (error, results) => {
              connection.release(); // Release the connection back to the pool (-1)

              // If any error occurs when using the query
              if (error) {
                console.error("Error inserting into users:", error);
                res.status(400).send({
                  success: false,
                  error: error,
                });
                return;
              } else {
                console.log("The result is:", results);

                // If insering data is complete.
                res.status(200).send({
                  success: true,
                  message: "User registered successfully",
                  results: results,
                });
              }
            }
          );
        }
      }
    );
  });
});

app.post("/login", (req, res) => {
  const body = req.body;

  // If any error occurs when using the query
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting a connection from the pool:", err);
      res.status(400).send({
        success: false,
        error: err,
      });
      return;
    }

    connection.query(
      `SELECT * FROM users WHERE email=?`,
      [body.email],
      (error, results) => {
        if (error) {
          console.error("Error querying the database:", error);
          res.status(400).send({
            success: false,
            error: error,
          });
          connection.release();
          return;
        }

        if (results.length < 1) {
          res.status(400).send({
            success: false,
            error: "No such user found",
          });
          connection.release();
        } else {
          connection.release();

          if (body.password === results[0].password) {
            res.status(200).send({
              success: true,
              message: "User login successfully",
              results: {
                id: results[0].id,
              },
            });
          } else {
            res.status(400).send({
              success: false,
              error: "Credentials doesn't match",
            });
          }
        }
      }
    );
  });
});

app.post("/upload", upload.single("abc"), (req, res) => {
  console.log(req.file);

  console.log(req.body);
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h2>Thank you</h2>
    <img src="http://127.0.0.1:3000/${req.file.path}" />
  </body>
</html>
`);
});

// Same as login but with different approach
app.post(
  "/login2",
  AsyncHandler(async (req, res) => {
    const body = req.body;

    // try {
    // Get a connection from the pool
    const connection = await getConnectionAsync(pool);

    // Query the database for the user with the provided email, it calls queryAsync Method/Function which gives either reject or resolve as retuen.
    const results = await queryAsync(
      connection,
      `SELECT * FROM users WHERE email=?`,
      [body.email]
    );

    // Release the connection back to the pool
    connection.release();

    console.log(results);

    // Check if no user found with the given email
    if (results.length < 1) {
      throw new Error("No such user found!!");
    }

    if (body.password === results[0].password) {
      res.status(200).send({
        success: true,
        message: "User login successful",
        results: {
          id: results[0].id,
        },
      });
    } else {
      throw new Error("Credentials Error");
    }
    // } catch (error) {
    //   console.error("Error in login:", error);
    //   res.status(400).send({
    //     success: false,
    //     error: error.message,
    //   });
    // }
  })
);

// Same as login but with different approach
// Check this without AsyncHandler What will be the case?
app.post("/login3", async (req, res, next) => {
  const body = req.body;

  // try {
  // Get a connection from the pool
  const connection = await getConnectionAsync(pool);

  // Query the database for the user with the provided email, it calls queryAsync Method/Function which gives either reject or resolve as retuen.
  const results = await queryAsync(
    connection,
    `SELECT * FROM users WHERE email=?`,
    [body.email]
  );

  // Release the connection back to the pool
  connection.release();

  console.log(results);

  // Check if no user found with the given email
  if (results.length < 1) {
    next(new Error("No such user found!!"));
  }

  if (body.password === results[0].password) {
    res.status(200).send({
      success: true,
      message: "User login successful",
      results: {
        id: results[0].id,
      },
    });
  } else {
    next(new Error("Credentials Error"));
  }
  // } catch (error) {
  //   console.error("Error in login:", error);
  //   res.status(400).send({
  //     success: false,
  //     error: error.message,
  //   });
  // }
});

// Helper function to do pool.getConnection using Promise
function getConnectionAsync(pool) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
}

// Helper function to do connection.query using Promise
function queryAsync(connection, sql, values) {
  return new Promise((resolve, reject) => {
    console.log("Query Sync");

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.log("Error ", error);
        reject(error);
      } else {
        console.log("Resolved ");
        resolve(results);
      }
    });
  });
}

// Try using this middleware before the login route what will happen...
app.use(ErrorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
