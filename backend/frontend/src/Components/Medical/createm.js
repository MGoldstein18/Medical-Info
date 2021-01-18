//import react, useState, axios and components from react-bootstrap
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

//functional component allow user to create a new profile
function MyModal(props) {

  //initialize state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [cell, setCell] = useState("");
  const [reg, setReg] = useState("");
  const [org, setOrg] = useState("");
  const [type, setType] = useState("");


  //functions to ensure that state is always the ultimate source

  function changeFirstName(e) {
    setFirstName(e.target.value);
  }

  function changeLastName(e) {
    setLastName(e.target.value);
  }

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }
  function changePassword2(e) {
    setPassword2(e.target.value);
  }
  function changeDob(e) {
    setDob(e.target.value);
  }
  function changeGender(e) {
    setGender(e.target.value);
  }
  function changeCell(e) {
    setCell(e.target.value);
  }
  function changeReg(e) {
    setReg(e.target.value);
  }
  function changeOrg(e) {
    setOrg(e.target.value);
  }
  function changeType(e) {
    setType(e.target.value);
  }

  //function to handle submit of the create account form
  function submit(e) {

    e.preventDefault();

    //ensure that passwords match
    const p1 = password;
    const p2 = password2;

    function validatePassword(password, password2) {
      if (password.length < 8) {
        return 1;
      } else if (password !== password2) {
        return 2;
      } else {
        return true;
      }
    }

    //if the passwords do not match display error message
    if (validatePassword(p1, p2) === 1) {
      alert("Problem! Your password is too short");
    } else if (validatePassword(p1, p2) === 2) {
      alert("Problem! Your password do not match each other");
    } else {
      //if the passwords do match create a new profile object with information from state 
      const newProfile = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        dob: dob,
        gender: gender,
        cell: cell,
        reg: reg,
        org: org,
        type: type,
      };

      //use an axios post request to send the new profile object and create the account
      axios
        .post("http://localhost:5000/medical/add", newProfile)
        .then(() => {
          window.location = "/";

          alert("Your account was successfully created. Please sign in");
        })
        .catch((err) => {
          console.log(err);
          alert(
            "There was an error creating your account. Please try again later. We apologies for the inconvenience!"
          );
        });
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h3 id="headingm">
          Create a <i>Medical</i> Account
        </h3>
      </Modal.Header>

      <Modal.Body>
        <p id="introm">
          A Medical Account is for doctors, paramedics and other medical
          professionals
        </p>
        <Form onSubmit={submit} autocomplete="new-password">
          <input type="hidden" />
          <Form.Group>
            <Form.Label>First Name(s)</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={changeFirstName}
              autoComplete="new-password"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={changeLastName}
              autocomplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={changeEmail}
              autocomplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={changePassword}
              autocomplete="none"
              required
            />
            <Form.Text className="text-muted">
              Password should be 8 characters, include capital and lower case
              letters and numbers
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Please retype your password</Form.Label>
            <Form.Control
              type="password"
              value={password2}
              onChange={changePassword2}
              autocomplete="none"
              required
            />
            <Form.Text className="text-muted">
              Password should be 8 characters, include capital and lower case
              letters and numbers
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of birth</Form.Label>
            <Form.Control
              type="date"
              value={dob}
              onChange={changeDob}
              autocomplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={gender}
              onChange={changeGender}
              autocomplete="none"
              required
            >
              <option>Please select an option</option>
              <option>Female</option>
              <option>Male</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Cell Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={cell}
              onChange={changeCell}
              autocomplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Registration Number</Form.Label>
            <Form.Control
              type="text"
              value={reg}
              onChange={changeReg}
              autocomplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>With which organisation are you affiliated?</Form.Label>
            <Form.Control
              type="text"
              value={org}
              onChange={changeOrg}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>What is your qualification?</Form.Label>
            <Form.Control
              type="text"
              value={type}
              onChange={changeType}
              autocomplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="submit"
              value="Submit and Create Account"
              className="btn btn-success"
            />
          </Form.Group>
                    
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        
      </Modal.Footer>
    </Modal>
  );
}

function Createlo(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        style={{ color: "#003049" }}
        className="shadow-lg p-3 mb-5 m-5 btn-lg"
        variant="info"
        onClick={() => setModalShow(true)}
      >
        <b>Create a </b>
        <i>Medical</i> <b>Account</b>
      </Button>

      <MyModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Createlo;
