//import mongoose
const mongoose = require("mongoose");

//create a new Schema
const Schema = mongoose.Schema;

const lovedOneSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    idNumber: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    cell: { type: String, required: true },
    allergies: { type: String, required: true },
    meds: { type: String, required: true },
    conditions: { type: String, required: true },
    eName: { type: String, required: true },
    eNumber: { type: String, required: true },
    views: { type: Array },
  },
  {
    timestamps: true,
  }
);

const LovedOne = mongoose.model("LovedOne", lovedOneSchema);

//export the Loved One schema
module.exports = LovedOne;
