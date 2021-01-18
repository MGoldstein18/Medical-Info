//import Loved One and medical models, JWT and date
const lovedOne = require("../Models/lovedOne.model.js");
const jwt = require("jsonwebtoken");
const Medical = require("../Models/medical.model.js");
const date = require("date-and-time");

//create one loved using info from body of request
const createLovedOne = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const idNumber = req.body.idNumber;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const cell = req.body.cell;
  const allergies = req.body.allergies;
  const meds = req.body.meds;
  const conditions = req.body.conditions;
  const eName = req.body.eName;
  const eNumber = req.body.eNumber;

  const newLovedOne = new lovedOne({
    firstName,
    lastName,
    email,
    password,
    idNumber,
    dob,
    gender,
    cell,
    allergies,
    meds,
    conditions,
    eName,
    eNumber,
  });

  newLovedOne
    .save()
    .then(() => res.json("Loved One Added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

//read one loved using the object ID from the body of the request
//Authenticate the user using the JWT
const getLovedOne = (req, res) => {
  const token = req.headers["authorization"];

  try {
    const decoded = jwt.verify(token, "jwt-secret");
    lovedOne
      .findById(decoded.id)
      .then((lovedOne) => res.json(lovedOne))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } catch (err) {
    res.status(401).json(`Error: ${err}`);
  }
};

//find Loved One by searching for an ID number
//Authenticate the medical professionals searching by checking their email and password from their JWT
//Create a log in the profile of the Loved One to record which Medical Professional accessed the information and when
const getLovedOneID = (req, res) => {
  const token = req.headers["authorization"];

  try {
    const decoded = jwt.verify(token, "jwt-secret");

    Medical.findById(decoded.id).then((medical) => {

      //create and format date and time
      const now = new Date();
      const pattern = date.compile("ddd, MMM DD YYYY");
      const dateViewed = date.format(now, pattern);
      const timeViewed = date.format(now, "hh:mm A [GMT]Z");

      //authenticate medical professional
      if (medical.email === decoded.email) {
        if (medical.password === decoded.password) {
          const filter = { idNumber: req.body.idNumber };
          const update = {
            $push: {
              views: {
                name: `${medical.firstName} ${medical.lastName}`,
                reg: medical.reg,
                org: medical.org,
                date: dateViewed,
                time: timeViewed,
              },
            },
          };

          //update the loved one
          lovedOne
            .findOneAndUpdate(filter, update)
            .then((lovedOne) => {
              res.json(lovedOne);
            })
            .catch((err) => res.status(400).json(`Error: ${err}`));
        } else {
          res.json("Invalid password");
        }
      } else {
        res.json("Invalid email address");
      }
    });
  } catch (err) {
    res.status(401).json(`Error: ${err}`);
  }
};

//update one loved one 
const updateLovedOne = (req, res) => {

  //authenticate the user using JWT
  const token = req.headers["authorization"];

  try {
    const decoded = jwt.verify(token, "jwt-secret");
    //create a filter to update the user with the correct object id
    const filter = { _id: decoded.id };

    //create the object with the updated info which is taken from the body of the request
    const update = {
      lastName: req.body.lastName,
      email: req.body.email,
      firstName: req.body.firstName,
      idNumber: req.body.idNumber,
      dob: req.body.dob,
      gender: req.body.gender,
      cell: req.body.cell,
      allergies: req.body.allergies,
      meds: req.body.meds,
      conditions: req.body.conditions,
      eName: req.body.eName,
      eNumber: req.body.eNumber,
    };

    /*update the loved and as the response, send the updated info object and the views from the LO profile so that they 
    can be accurately displayed in the frontend*/
    lovedOne
      .findOneAndUpdate(filter, update)
      .then((response) =>
        res.json({ updatedInfo: update, views: response.views })
      )
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } catch (err) {
    res.status(401).json(`Error: ${err}`);
  }
};


//export all controller functions
module.exports = {
  createLovedOne,
  getLovedOne,
  updateLovedOne,
  getLovedOneID,
};
