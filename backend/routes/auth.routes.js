//import express, router and the methods from the auth controller
const express = require("express");
const router = express.Router();
const { auth } = require("../Controllers/Auth.controller.js");

//use the routes
router.post("/", auth);

//export the router
module.exports = router;
