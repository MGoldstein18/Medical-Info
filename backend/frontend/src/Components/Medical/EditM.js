//import react, axios and components from react-bootstrap
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

//class component to allow the user to edit their details
class EditMform extends React.Component {
  //initialize state
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      gender: "",
      cell: "",
      reg: "",
      org: "",
      type: "",
      token: "",
    };
    this.change = this.change.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.submit = this.submit.bind(this);
  }

  //when component mounts, retrieve the user object from session storage and save it to state
  //Also, get the token from local storage and save to state
  componentDidMount() {
    const profile = JSON.parse(sessionStorage.getItem("user"));
    this.setState({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      dob: profile.dob,
      gender: profile.gender,
      cell: profile.cell,
      reg: profile.reg,
      org: profile.org,
      type: profile.type,
      token: JSON.parse(localStorage.getItem("token")),
    });
  }

  //function to ensure that state remains the ultimate source
  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //function to handle the submit of the edit form
  submit(e) {
    e.preventDefault();

    //create a new updated user profile object
    const updatedProfile = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      dob: this.state.dob,
      gender: this.state.gender,
      cell: this.state.cell,
      reg: this.state.reg,
      org: this.state.org,
      type: this.state.type,
    };

    //send the new user profile object using a post request
    axios
      .post("http://localhost:5000/medical/update", updatedProfile, {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((res) => {
        //save the response object containing the user's updated info to session storage and return user to the dashboard
        sessionStorage.setItem("user", JSON.stringify(res.data));
        alert("Your account was successfully updated!");
        window.location = "/medical";
      })
      .catch((err) => {
        alert(
          "There was an error updating your account. Please try again. We apologies for the inconvenience!"
        );
      });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      dob,
      gender,
      cell,
      reg,
      org,
      type,
    } = this.state;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h3 id="headinglo">Edit your Information</h3>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.submit} autoComplete="new-password">
            <input type="hidden" />
            <Form.Group>
              <Form.Label>First Name(s)</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={this.change}
                name="firstName"
                autoComplete="new-password"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={this.change}
                name="lastName"
                autoComplete="none"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={this.change}
                name="email"
                autoComplete="none"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                type="date"
                value={dob}
                onChange={this.change}
                name="dob"
                autoComplete="none"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                value={gender}
                onChange={this.change}
                name="gender"
                autoComplete="none"
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
                onChange={this.change}
                name="cell"
                autoComplete="none"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Practice/Registration Number:</Form.Label>
              <Form.Control
                type="text"
                value={reg}
                onChange={this.change}
                name="reg"
                autoComplete="none"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Organization</Form.Label>
              <Form.Control
                type="text"
                value={org}
                onChange={this.change}
                name="org"
                autoComplete="none"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Qualification:</Form.Label>
              <Form.Control
                type="text"
                value={type}
                onChange={this.change}
                name="type"
                autoComplete="none"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="submit"
                value="Submit and Update Information"
                className="btn btn-success"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class EditM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      user: {},
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
    });
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this.setState({
      modalShow: true,
    });
  }

  hide() {
    this.setState({ modalShow: false });
  }

  render() {
    return (
      <>
        <Button
          style={{ color: "#003049" }}
          className="shadow-lg p-3 mb-5 m-5 btn-lg"
          variant="info"
          onClick={this.show}
        >
          Edit information
        </Button>

        <EditMform
          rel={this.props.name}
          show={this.state.modalShow}
          onHide={this.hide}
        />
      </>
    );
  }
}

export default EditM;
