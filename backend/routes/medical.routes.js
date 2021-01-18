//import express, router and relevant functions from the medical controller
const express = require("express");
const router = express.Router();
const {
  createMedical,
  getMedical,
  updateMedical,
} = require("../Controllers/medical.controllers.js");

//set up routes for each function
router.post("/add", createMedical);
router.get("/get", getMedical);
router.post("/update", updateMedical);

//export the router
module.exports = router;
