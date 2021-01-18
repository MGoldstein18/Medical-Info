//import mongoose
const mongoose = require("mongoose")

//create a new schema
const Schema = mongoose.Schema;

const medicalSchema = new Schema (
    {
        firstName : {type: String, required: true},
        lastName: {type: String, required: true},
        dob : {type: String, required: true},
        gender : {type: String, required: true},
        cell : {type: String, required: true},
        email : {type: String, required: true},
        password: {type: String, required: true},
        reg : {type: String, required: true},
        org: {type: String, required: true},
        type : {type: String, required: true}

    }, 
    {
        timestamps: true
    }
)

const Medical = mongoose.model("Medical", medicalSchema)

//export the medical schema
module.exports = Medical;