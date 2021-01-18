//import react, axios and the form component from react-bootstrap
import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

//class component to allow a medical professional to search for a Loved One's information
class Search extends React.Component {
  //initialize state
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      user: {},
      results: false,
    };

    this.change = this.change.bind(this)
    this.submit = this.submit.bind(this);
    this.again = this.again.bind(this);
  }

  //function to ensure that state is the ultimate source
  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submit(e) {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));

    const newSearch = {
      idNumber: this.state.id,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/lovedone/search", newSearch, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          user: response.data,
          results: !this.state.results,
        });
      })
      .catch((err) => console.log(err));
  }

  again() {
    this.setState({
      id: "",
      email: "",
      password: "",
      user: {},
      results: false,
    });
  }

  render() {
    const { id, email, password, results } = this.state;
    const {
      firstName,
      lastName,
      dob,
      gender,
      userEmail,
      cell,
      idNumber,
      eName,
      eNumber,
      allergies,
      meds,
      conditions,
    } = this.state.user;

    return (
      <div>
        <div style={{ display: results ? "none" : null }}>
          <Form onSubmit={this.submit}>
            <Form.Group>
              <Form.Label>Patient ID Number</Form.Label>
              <Form.Control
                type="text"
                value={id}
                onChange={this.change}
                name="id"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Medical Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={this.change}
                autoComplete="none"
                name="email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Medical Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={this.change}
                autoComplete="none"
                name="password"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="submit"
                value="Search"
                className="btn btn-success"
              />
            </Form.Group>
          </Form>
        </div>
        <div style={{ display: results ? null : "none" }}>
          <hr />
          <br />
          <p>
            <b>Name:</b> {firstName} {lastName}
          </p>
          <p>
            <b>Date of Birth:</b> {dob}
          </p>
          <p>
            <b>Gender:</b> {gender}
          </p>
          <p>
            <b>ID Number:</b> {idNumber}
          </p>
          <p>
            <b>Email Address:</b> {userEmail}
          </p>
          <p>
            <b>Cell Phone Number:</b> {cell}
          </p>
          <br />
          <p>
            <b>Emergency Contact Name:</b> {eName}
          </p>
          <p>
            <b>Emergency Contact Number:</b> {eNumber}
          </p>
          <br />
          <p>
            <b>Allergies:</b> {allergies}
          </p>
          <p>
            <b>Pre-Existing Conditions:</b> {conditions}
          </p>
          <p>
            <b>Chronic Medication:</b> {meds}
          </p>
          <button className="btn btn-lg btn-info" onClick={this.again}>
            Close Information and/or Search Again
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
