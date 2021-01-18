//import React and CSS
import React from "react";
import "../App.css";

//This is the footer component
class Footer extends React.Component {
  render() {
    return (
      <footer className="row p-5">
        <p className="col text-center">Secure</p>
        <p className="col text-center">Reliable</p>
        <p className="col text-center">Instant</p>
      </footer>
    );
  }
}

export default Footer;
