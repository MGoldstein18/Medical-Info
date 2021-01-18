//import React, CSS, and components to sign in and create the different accounts
//Bootstrap is also used for styling
import React from "react";
import "../App.css";
import CreateLO from "./LovedOne/Createlo.js";
import Createm from "./Medical/createm.js";
import SignIn from "./SignIn.js";

class Home extends React.Component {
  render() {
    return (
      <div className="container-xs mt-5">
        <div id="heading" className="shadow-lg m-5 jumbotron jumbotron-fluid">
          <h1 className="mt-5">AMIT - Save a life</h1>
          <p className="lead m-5">
            Share critical medical information instantly with medical
            professionals using your ID number or Popl
          </p>
          <div className="row">
            <div className="col-lg">
              {" "}
              <button className="shadow-lg p-3 m-5 btn-lg btn-warning">
                <a style={{ color: "#AC2020" }} href="#lovedOne">
                  Create Account
                </a>
              </button>
            </div>
            <div className="col-lg">
              <SignIn />
            </div>
          </div>
        </div>

        <section className="mt-5 intro row">
          <p
            style={{ color: "#F47552" }}
            className="col-lg align-self-start text-center"
          >
            When a paramedic arrives at a call...
          </p>
          <p style={{ color: "#D3380D" }} className="col align-self-end">
            <b>information can save a life!</b>
          </p>
        </section>
        <br/>

        <section className="questions row mt-5">
          <p
            style={{ color: "#E37892" }}
            className="col-lg align-self-start text-center"
          >
            Does the paramedic know if you have <b>allergies?</b>
          </p>
          <p
            style={{ color: "#D9456A" }}
            className="col-lg align-self-center text-center"
          >
            Does your mom have a <b>pre-existing condition?</b>
          </p>
          <p
            style={{ color: "#BA264B" }}
            className="col-lg align-self-end text-center"
          >
            Is your son on <b>chronic medication?</b>
          </p>
        </section>

        <section className="m-5 p-5 action text-center">
          <p>
            Use <b>AMIT</b> to instantly share critical information with medical
            professionals using your ID number or Popl
          </p>
          <button className="shadow-lg p-3 mb-5 m-5 btn-lg btn-warning">
            <a style={{ color: "#AC2020" }} href="#lovedOne">
              Create Account
            </a>
          </button>
        </section>

        <section className="row">
          <div
            id="lovedOne"
            className="shadow-lg p-3 mb-5 col-lg container p-5 text-center"
          >
            <div className="family row">
              <p className="col align-self-start text-center">Mom & Dad</p>
              <p className="col align-self-end">Brother & Sister</p>
            </div>
            <div className="family row">
              <p className="col align-self-start text-center">Son & Daughter</p>
              <p className="col align-self-end">
                <b>All our loved ones...</b>
              </p>
            </div>
            <CreateLO />

            <p className="mt-3">
              <b>Safe and Confident</b>
            </p>
            <p style={{ fontSize: "22px" }}>
              Medical professionals will have access to information if they need
              to save your life
            </p>

            <p className="mt-5">
              <b>Secure and In Control</b>
            </p>
            <p style={{ fontSize: "22px" }}>
              Control what information is accessible and know who accesses your
              information and when
            </p>
          </div>
          <div
            id="medical"
            className="shadow-lg p-3 mb-5 col-lg container p-5 text-center"
          >
            <div id="profs">
              <p>Paramedics,</p>
              <p>Doctors,</p>
              <p>Medical professionals,</p>
            </div>

            <p id="future" className="text-center p-5">
              <b>Welcome to the future!</b>
            </p>
            <Createm />
            <ul className="text-center medical-list">
              <li> ~ Built for use in the field</li>
              <li> ~ Reliable information</li>
              <li> ~ Efficient Access</li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
