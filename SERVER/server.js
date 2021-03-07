const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// import routes

const feedbackRoutes = require("./routes/routes.js");

// App

const app = express();

// middlewares

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

// routes

app.use("/api", feedbackRoutes);

// port

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));
