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
    <title>Document</title>
  </head>
  <body>
    <form action="/watch" method="POST">
      <input type="text" name="test" />
    </form>
  </body>
</html>
`);
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World!\n");
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});

// run with `node server.mjs`
