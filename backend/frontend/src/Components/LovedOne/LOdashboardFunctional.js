//import React, the edit profile component and the table from react-bootstrap
import React, { useState, useEffect } from "react";
import EditLO from "./EditLO.js";
import { Table } from "react-bootstrap";
import ViewList from "./ViewList.js";

//this functional component is the Loved One's dashboard
//Displays their information and allows them to edit it and displays a table with the medical professionals who have viewed their profile
function LovedOneDashboard(props) {
  //initialise state
  const [user, setUser] = useState({});

  //when component mounts, retrieve the user object which saved in session storage at sign in and set user state to it
  useEffect(() => {
    const profile = JSON.parse(sessionStorage.getItem("user"));
    setUser(profile);
  }, []);

  //this function displays the table using the info in state
  function viewList() {
    if (user.views) {
      return user.views.map((view) => {
        return (
          <ViewList
            name={view.name}
            reg={view.reg}
            org={view.org}
            date={view.date}
            time={view.time}
          />
        );
      });
    }
  }

  return (
    <div className="container fluid mt-5">
      <header id="dashboardLOheader" className="row text-center mb-5">
        
        <div className="col-lg">
          <h1>Welcome, {user.firstName}</h1>
          <hr />
          <p>This is your dashboard.</p>{" "}
          <p>
            Here, you can view and edit your information and see which medical
            professionals have accessed your information.
          </p>
        </div>
      </header>
      <section className="row" id="dashboardLO">
        <div className="col-lg" id="LOprofile">
          <h3>Profile</h3>
          <hr />
          <p>
            <b>Name:</b> {user.firstName} {user.lastName}
          </p>
          <p>
            <b>Date of Birth:</b> {user.dob}
          </p>
          <p>
            <b>Gender:</b> {user.gender}
          </p>
          <p>
            <b>ID Number:</b> {user.idNumber}
          </p>
          <p>
            <b>Email Address:</b> {user.email}
          </p>
          <p>
            <b>Cell Phone Number:</b> {user.cell}
          </p>
          <br />
          <p>
            <b>Emergency Contact Name:</b> {user.eName}
          </p>
          <p>
            <b>Emergency Contact Number:</b> {user.eNumber}
          </p>
          <br />
          <p>
            <b>Allergies:</b> {user.allergies}
          </p>
          <p>
            <b>Pre-Existing Conditions:</b> {user.conditions}
          </p>
          <p>
            <b>Chronic Medication:</b> {user.meds}
          </p>
          <EditLO />
        </div>
        <div className="col-lg" id="LOaccess">
          <h3>Who has accessed your information:</h3>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Medical Professional</th>
                <th>Qualification</th>
                <th>Organization</th>
                <th>Date Viewed</th>
                <th>Time Viewed</th>
              </tr>
            </thead>
            <tbody>{viewList()}</tbody>
          </Table>
        </div>
      </section>
    </div>
  );
}

export default LovedOneDashboard;
