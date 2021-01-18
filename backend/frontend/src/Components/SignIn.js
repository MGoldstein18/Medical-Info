//import axios, React, components from react and react-bootstrap
import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

//this is the sign in component which is modal and allows the user to sign into their account
function SignInForm(props) {
  //initialize state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");

  //functions to ensure that state is always the ultimate source
  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function changeAccount(e) {
    setAccount(e.target.value);
  }

  //function to handle submit of the sign in form
  function submit(e) {
    e.preventDefault();

    //create a new object with the sign in details
    const newSignIn = {
      email: email,
      password: password,
      account: account,
    };

    //make a post request to authenticate the user trying to sign in
    axios
      .post("http://localhost:5000/auth", newSignIn)
      .then((response) => {
        
        //if they are successfully authenticated, save their token to local storage
        localStorage.setItem("token", JSON.stringify(response.data));
        //then check if the account is a medical account or a loved one account
        //Perform the get request to get the user's information and save that to session storage and send the user to the relevant dashboard
        if (account === "Loved One") {
          axios
            .get("http://localhost:5000/lovedone/get", {
              headers: {
                Authorization: response.data,
              },
            })
            .then((response) => {
              console.log(response.data);
              sessionStorage.setItem("user", JSON.stringify(response.data));
              window.location = "/lovedone";
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (account === "Medical") {
          axios
            .get("http://localhost:5000/medical/get", {
              headers: {
                Authorization: response.data,
              },
            })
            .then((response) => {
              console.log(response.data);
              sessionStorage.setItem("user", JSON.stringify(response.data));
              window.location = "/medical";
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch(() => alert("Invalid sign in details!"));
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h3 id="headingSign">Sign In</h3>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={changeEmail}
              autoComplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={changePassword}
              autoComplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Is your account a Medical or a Loved One account?
            </Form.Label>
            <Form.Control
              as="select"
              value={account}
              onChange={changeAccount}
              autoComplete="none"
              required
            >
              <option>Please select an option...</option>
              <option>Medical</option>
              <option>Loved One</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="submit"
              value="Submit and Sign In"
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

function SignIn(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        className="shadow-lg p-3 m-5 btn-lg"
        variant="warning"
        onClick={() => setModalShow(true)}
        style={{ color: "#AC2020" }}
      >
        Sign In
      </Button>

      <SignInForm show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default SignIn;
