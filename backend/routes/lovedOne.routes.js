//import express, router and the relevant functions from the controller file
const express = require("express");
const router = express.Router();
const {
  createLovedOne,
  getLovedOne,
  updateLovedOne,
  getLovedOneID,
} = require("../Controllers/lovedOne.Controllers.js");

//set up the routes for each function
router.post("/add", createLovedOne);
router.get("/get", getLovedOne);
router.post("/update", updateLovedOne);
router.post("/search", getLovedOneID);

//export the router
module.exports = router;
