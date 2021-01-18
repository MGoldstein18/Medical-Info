//import React and CSS
import React from "react";
import "../App.css";


//This component is the contact page and allows the user to submit a form for use to contact them
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  render() {
    return (
      <div className="mt-5 mb-5 p-5 shadow-lg contact">
        <div className="us">
          <h3>Contact Us</h3>
          <hr />
          <br />
          <div className="row">
            <p className="col-lg">+27 76 832 4579</p>
            <p className="col-lg">hello@amit.com</p>
          </div>
        </div>
        <div className="mt-5 you">
          <h3>We'll Contact You</h3>
          <hr />
          <br />
          <form className="text-center">
            <input
              type="email"
              required
              placeholder="Email address..."
              className="form-control"
              value={this.state.email}
              onChange={this.onChange}
            />
            <input
              type="submit"
              className="btn btn-outline-success btn-lg mt-3"
              value="Contact Me"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
