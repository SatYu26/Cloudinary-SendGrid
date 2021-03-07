const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// App

const app = express();

// middlewares

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

// routes

app.get("/api", (req, res) => {
  res.json({
    data: "first server",
  });
});

// port

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));
