//import react, useState, axios and components from react-bootstrap
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

//functional component to allow user to create Loved One account
function MyModal(props) {

  //initialize state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [cell, setCell] = useState("");
  const [allergies, setAllergies] = useState("");
  const [meds, setMeds] = useState("");
  const [conditions, setConditions] = useState("");
  const [eName, seteName] = useState("");
  const [eNumber, seteNumber] = useState("");

  //functions to ensure that State is always the ultimate source
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
  function changeIdNumber(e) {
    setIdNumber(e.target.value);
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
  function changeAllergies(e) {
    setAllergies(e.target.value);
  }
  function changeMeds(e) {
    setMeds(e.target.value);
  }
  function changeConditions(e) {
    setConditions(e.target.value);
  }
  function changeeName(e) {
    seteName(e.target.value);
  }
  function changeeNumber(e) {
    seteNumber(e.target.value);
  }

  //function to handle submit of the create account form
  function submit(e) {

    e.preventDefault();

    //check that that two passwords entered by the user match
    const p1 = password
    const p2 = password2

    function validatePassword(password, password2){
      if (password.length < 8) {
        return 1;
      } else if (password !== password2) {
        return 2;
      } else {
        return true;
      }
    };

    //if they dont match, display error messages
    if (validatePassword(p1, p2) === 1) {
      alert("Problem! Your password is too short");
    } else if (validatePassword(p1, p2) === 2) {
      alert("Problem! Your password do not match each other");
    } else {

      //if the passwords do match, create a new profile object with the info in state 
      const newProfile = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        idNumber: idNumber,
        dob: dob,
        gender: gender,
        cell: cell,
        allergies: allergies,
        meds: meds,
        conditions: conditions,
        eName: eName,
        eNumber: eNumber,
      };

      //send the new profile object using a post request
      axios
        .post("http://localhost:5000/lovedone/add", newProfile)
        .then((res) => {
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
        <h3 id="headinglo">
          Create a <i>Loved One</i> Account
        </h3>
      </Modal.Header>

      <Modal.Body>
        <p id="introlo">
          A Loved One account is for me and you - regular members of the public
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
            <Form.Label>ID Number</Form.Label>
            <Form.Control
              type="text"
              value={idNumber}
              onChange={changeIdNumber}
              autocomplete="none"
              required
            />
            <Form.Text className="text-muted">
              Your South African ID number or passport number if you are not
              South African
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
          <br />
          <hr />
          <br />
          <h5>
            The questions below concern critical medical information.
          </h5>{" "}
          <br />
          <h5>Please answer clearly and with detail</h5>
          <br />
          <Form.Group>
            <Form.Label>
              Are you allergic to anything? How is your allergy treated?
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={allergies}
              onChange={changeAllergies}
              autocomplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Do you take any chronic medication? What does it treat?
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={meds}
              onChange={changeMeds}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Do you have any pre-existing conditions? Please provide detail{" "}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={conditions}
              onChange={changeConditions}
              autocomplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Emergency Contact Name</Form.Label>
            <Form.Control type="text" value={eName} onChange={changeeName} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Emergency Contact Number</Form.Label>
            <Form.Control
              type="text"
              value={eNumber}
              onChange={changeeNumber}
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
        style={{ color: "#FCBA36" }}
        className="shadow-lg p-3 mb-5 m-5 btn-lg"
        variant="danger"
        onClick={() => setModalShow(true)}
      >
        <b>Create a </b>
        <i>Loved One</i> <b>Account</b>
      </Button>

      <MyModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Createlo;
