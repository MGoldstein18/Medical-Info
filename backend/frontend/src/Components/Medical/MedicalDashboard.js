//import react, components from react, the edit profile and search components
import React, { useState, useEffect } from "react";
import EditM from "./EditM.js";
import Search from "./Search.js";

//function component to allow user to view and edit their information and search for a Loved One's details
function MedicalDashboard(props) {

  //initialize state
  const [user, setUser] = useState({});

  //when component mounts, get the user object from session storage saved in the sign in component and save it to state
  useEffect(() => {
    const profile = JSON.parse(sessionStorage.getItem("user"));
    setUser(profile);
  }, []);

  return (
    <div className="mt-5 container fluid">
      <header id="dashboardMheader" className="mb-5">
        <h1>Welcome, {user.firstName}</h1>
        <hr />
        <p>This is your dashboard</p>
        <p>
          Here, you can view and edit your information and search for patient
          details
        </p>
      </header>
      <section className="row"  id="dashboardM">
        <div className="col-lg" id="Mprofile">
          <h3>Profile</h3>
          <hr />
          <p>
            <b>Name: </b>
            {user.firstName} {user.lastName}
          </p>
          <p>
            <b>Date of Birth: </b>
            {user.dob}
          </p>
          <p>
            <b>Gender: </b>
            {user.gender}
          </p>
          <p>
            <b>Cell Phone Number: </b>
            {user.cell}
          </p>
          <p>
            <b>Email Address: </b>
            {user.email}
          </p>
          <p>
            <b>Practice/Registration Number: </b>
            {user.reg}
          </p>
          <p>
            <b>Organization: </b>
            {user.org}
          </p>
          <p>
            <b>Qualification: </b>
            {user.type}
          </p>
          <EditM name={user} />
        </div>
        <div className="col-lg" id="Msearch">
          <h3>Search for a patient's information: </h3>
          <Search />
        </div>
      </section>
    </div>
  );
}

export default MedicalDashboard;
