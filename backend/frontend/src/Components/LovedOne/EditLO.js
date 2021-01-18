//import React, react-bootstrap components and axios
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

//class component to edit the information of a user
class EditLOform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      idNumber: "",
      dob: "",
      gender: "",
      cell: "",
      allergies: "",
      conditions: "",
      meds: "",
      eName: "",
      eNumber: "",
      token: "",
      show: false,
      user: {},
    };
    this.change = this.change.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.submit = this.submit.bind(this);
  }

  //When the component mounts retrieve the user object from session storage and save to state
  componentDidMount() {
    const profile = JSON.parse(sessionStorage.getItem("user"));
    this.setState({
      user: profile,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      idNumber: profile.idNumber,
      dob: profile.dob,
      gender: profile.gender,
      cell: profile.cell,
      allergies: profile.allergies,
      conditions: profile.conditions,
      meds: profile.meds,
      eName: profile.eName,
      eNumber: profile.eNumber,
      token: JSON.parse(localStorage.getItem("token")),
      show: true,
    });
  }

  //function to ensure that state is always the source of truth
  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //function to handle submit of the form
  submit(e) {
    e.preventDefault();

    //create updated profile object with new information from state
    const updatedProfile = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      idNumber: this.state.idNumber,
      dob: this.state.dob,
      gender: this.state.gender,
      cell: this.state.cell,
      allergies: this.state.allergies,
      meds: this.state.meds,
      conditions: this.state.conditions,
      eName: this.state.eName,
      eNumber: this.state.eNumber,
    };

    //uses a post request to send the undated information in the body with the token in the headers
    axios
      .post("http://localhost:5000/lovedone/update", updatedProfile, {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((res) => {
        //get the update information object and the views array from the response object and save to variables
        const profile = res.data.updatedInfo;
        const view = res.data.views;

        //create a new profile object to combine the updated info object and views object
        const newProfile = {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          idNumber: profile.idNumber,
          dob: profile.dob,
          gender: profile.gender,
          cell: profile.cell,
          allergies: profile.allergies,
          meds: profile.meds,
          conditions: profile.conditions,
          eName: profile.eName,
          eNumber: profile.eNumber,
          views: view,
        };

        //save the new object to session storage and send the user back to the dashboard
        sessionStorage.setItem("user", JSON.stringify(newProfile));
        alert("Your account was successfully updated!");
        window.location = "/lovedone";
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
      idNumber,
      dob,
      gender,
      cell,
      allergies,
      meds,
      conditions,
      eName,
      eNumber,
    } = this.state;

    return (
      <div className="container fluid">
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
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                type="text"
                value={idNumber}
                onChange={this.change}
                name="idNumber"
                autoComplete="none"
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
                onChange={this.gender}
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
                onChange={this.change}
                name="allergies"
                autoComplete="none"
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
                onChange={this.meds}
                name="meds"
                required
                autoComplete="none"
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
                onChange={this.change}
                name="conditions"
                autoComplete="none"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Emergency Contact Name</Form.Label>
              <Form.Control
                type="text"
                value={eName}
                onChange={this.change}
                name="eName"
                autoComplete="none"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Emergency Contact Number</Form.Label>
              <Form.Control
                type="text"
                value={eNumber}
                onChange={this.change}
                name="eNumber"
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
      </div>
    );
  }
}

class EditLO extends React.Component {
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
          style={{ color: "#FCBA36" }}
          className="shadow-lg p-3 mb-5 m-5 btn-lg"
          variant="danger"
          onClick={this.show}
        >
          Edit information
        </Button>

        <EditLOform
          rel={this.props.name}
          show={this.state.modalShow}
          onHide={this.hide}
        />
      </>
    );
  }
}

export default EditLO;
