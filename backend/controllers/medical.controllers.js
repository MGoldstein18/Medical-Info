//import medical model and jsonwebtoken
const medical = require("../Models/medical.model.js");
const jwt = require("jsonwebtoken");

//create one medical using info from body of the request
const createMedical = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const cell = req.body.cell;
  const email = req.body.email;
  const password = req.body.password;
  const reg = req.body.reg;
  const org = req.body.org;
  const type = req.body.type;

  const newMedical = new medical({
    firstName,
    lastName,
    dob,
    gender,
    cell,
    email,
    password,
    reg,
    org,
    type,
  });

  newMedical
    .save()
    .then(() => res.json("Medical Professional Added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

//read one medical using the object ID from the authenticated JWT
const getMedical = (req, res) => {
  const token = req.headers["authorization"];

  try {
    const decoded = jwt.verify(token, "jwt-secret");
    medical
      .findById(decoded.id)
      .then((medical) => res.json(medical))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    res.status(401).json(err);
  }
};

//update one medical
const updateMedical = (req, res) => {
  //authenticate user with JWT
  const token = req.headers["authorization"];

  try {
    const decoded = jwt.verify(token, "jwt-secret");

    //create filter to update the medical with the correct object ID
    const filter = { _id: decoded.id };

    //create object with updated info
    const update = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      cell: req.body.cell,
      password: req.body.password,
      reg: req.body.reg,
      org: req.body.org,
      type: req.body.type,
    };

    /*update the filtered medical profile with the updated info object and send the updated info object as the response so that 
    the frontend can accurately display the updated information*/
    medical
      .findOneAndUpdate(filter, update)
      .then(() => res.json(update))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } catch (err) {
    res.status(401).json(`Error: ${err}`);
  }
};


//export all functions for use in routes
module.exports = {
  createMedical,
  getMedical,
  updateMedical,
};
