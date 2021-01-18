//import jsonwebtoken, express, and the relevant models
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const LovedOne = require("../Models/lovedOne.model.js");
const Medical = require("../Models/medical.model.js");

//express middleware
app.use(express.json());

//function to authenticate users
const auth = async (req, res) => {
  //get the relevant info from the request
  const email = req.body.email;
  const password = req.body.password;
  const account = req.body.account;

  //check if the user is a Loved One or Medical Professional
  //Then validate them by checking their email and password. If they're are validated save their email, password and ID into the jwt and send it
  if (account === "Loved One") {
    const userValid = await LovedOne.find({ email: email });
    if (!userValid) {
      res.status(403).json("Invalid Email");
    } else if (userValid[0].password !== password) {
      res.status(403).json("Invalid Password!");
    } else {
      const payload = {
        id: userValid[0]._id,
      };
      const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
        algorithm: "HS256",
      });

      res.json(token);
    }
  } else if (account === "Medical") {
    const userValid = await Medical.find({ email: email });
    if (!userValid) {
      res.status(403).json("Invalid Email");
    } else if (userValid[0].password !== password) {
      res.status(403).json("Invalid Password!");
    } else {
      const payload = {
        id: userValid[0]._id,
        email: userValid[0].email,
        password: userValid[0].password,
      };
      const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
        algorithm: "HS256",
      });

      res.json(token);
    }
  }
};

//export the functions to make routes
module.exports = {
  auth,
};
