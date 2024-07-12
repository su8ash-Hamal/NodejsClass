// server.mjs
// import { createServer } from "node:http";

const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);

  if (req.url === "/watch" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!DOCTYPE html>
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
    return;
  }

  if (req.url === "/register" && req.method === "POST") {
    let body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("ERROR fOUND!\n");
        return;
      } else {
        let ar = Buffer.concat(body).toString();

        let parse = ar.split("&");
        console.log(ar);
        console.log(parse.split);

        res.writeHead(200, { "Content-Type": "application/json" });

        let obje1 = {
          username: parse[0].split("=")[1],
          email: parse[1].split("=")[1],
          password: parse[2].split("=")[1],
        };

        res.end(JSON.stringify(obje1));

        //         res.end(`<!DOCTYPE html>
        // <html lang="en">
        //   <head>
        //     <meta charset="UTF-8" />
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        //     <title>Document</title>
        //   </head>
        //   <body>
        //     <h2>Thank you ${parse[0].split("=")[1]}</h2>
        //   </body>
        // </html>`);
        return;
      }
    });
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World!\n");
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});

// run with `node server.mjs`
