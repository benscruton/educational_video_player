require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 8000;
const routes = require("./server/routes");

const app = express();

app.use(
  cors(),
  express.json(),
  express.urlencoded({extended: true}),
  routes
);
// app.use(express.static(path.join(
//   __dirname,
//   "client",
//   "build"
// )));

app.listen(port, () =>
  console.log("Listening on port", port)
);