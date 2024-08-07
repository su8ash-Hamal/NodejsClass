const express = require("express");
const bodyParser = require("body-parser");

// const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// replace process.env.DB_URL with your DB Url
// Go to MongoDB cloud then go to database the go to connect ang then go to compass. There you find a url with mongodb+srv://<username>:<password>@testcluster.pnaf28h.mongodb.net/
// replace username with your username and password with your password
// text after @ could vary.
// mongoose
//   .connect(process.env.DB_URL)
//   .then((data) => {
//     console.log("Connected Successfully");
//   })
//   .catch((err) => {
//     console.log(err);

//     console.log("Error during connection ");
//   });

// const cats = require("./controller/cat");
// const rats = require("./controller/rat");
// const users = require("./controller/user");

// app.use("api/v2/cats", cats);
// app.use("/rats", rats);
// app.use("/users", users);

const { PrismaClient } = require("@prisma/client");
const { default: axios } = require("axios");

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  console.log(allUsers);
  return allUsers;
}

// const https = require("node:https");

// const gettingData = () => {
//   return new Promise((resolve, reject) => {
//     https
//       .get("https://jsonplaceholder.typicode.com/posts", (res) => {
//         // console.log("statusCode:", res.statusCode);
//         // console.log("headers:", res.headers);

//         let finalData = "";

//         res.on("data", (d) => {
//           // resolve(d);
//           finalData += d;
//           // console.log(d);
//           // console.log("================");
//         });

//         res.on("end", () => {
//           resolve(finalData);
//         });
//       })
//       .on("error", (e) => {
//         console.error(e);
//         reject("Error during data fetch");
//       });
//   });
// };

app.get("/testing", async (req, res) => {
  try {
    const axiosKoData = await axios.get(
      "https://jsonplaceholder.typide.com/posts"
    );
    console.log(axiosKoData.data);
    res.send(axiosKoData.data);
  } catch (error) {
    console.log(error);
    res.send("Error found");
  }

  // console.log(data);

  // const parsedData = JSON.parse(data);

  // console.log(parsedData);
});

app.post("/", async (req, res) => {
  const response = await prisma.user.create({
    data: req.body,
  });

  res.send(response);
});

app.get("/", (req, res) => {
  main()
    .then(async (data) => {
      await prisma.$disconnect();
      res.send(data);
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      // process.exit(1);
    });
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error during connection");
  }
  console.log("Server on http://localhost:" + process.env.PORT);
});

// kitty.save().then(() => console.log("meow"));
