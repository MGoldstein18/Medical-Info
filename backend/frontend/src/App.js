//import React, CSS, ReactRouter and components
import React from "react";
import "./App.css";
import Home from "./Components/Home.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from "./Components/Menu.js"
import Footer from "./Components/Footer.js";
import Contact from "./Components/Contact.js";
import Popl from "./Components/Popl.js";
import Faq from "./Components/Faq.js";
import Medical from "./Components/Medical/MedicalDashboard.js";
import LovedOne from "./Components/LovedOne/LOdashboardFunctional.js";

//wrap components in ReactRouter and use bootstrap CDN
function App() {
  return (
    <Router>
      <div className="container">
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossOrigin="anonymous"
        ></link>
        <script src="bootstrap.js"></script>
        <Menu/>
        <Route path="/" exact component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/popl" component={Popl} />
        <Route path="/faq" component={Faq} />
        <Route path="/medical" component={Medical} />
        <Route path="/lovedone" component={LovedOne} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
