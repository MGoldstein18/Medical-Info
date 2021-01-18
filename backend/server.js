//import express, cors, helmet, mongoose and initiate app and PORT variables
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const helmet = require("helmet");

//use .env
require("dotenv").config();

//use helmet
app.use(helmet());

//express middleware
app.use(cors());
app.use(express.json());

//get routes and use each of them
const lovedOneRoutes = require("./Routes/lovedOne.routes.js");
const medicalRoutes = require("./Routes/medical.routes.js");
const authRoutes = require("./Routes/auth.routes.js");

app.use("/lovedone", lovedOneRoutes);
app.use("/medical", medicalRoutes);
app.use("/auth", authRoutes);

//get uri from .env file
const uri = process.env.URI;

//connect to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Connected to Database!"));

//start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
