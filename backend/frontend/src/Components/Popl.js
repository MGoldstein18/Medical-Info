//import React and css
import React from "react";
import "../App.css";

//This component is the Popl explanation page
class Popl extends React.Component {
  render() {
    return (
      <div className="container fluid mt-5" id="popl">
        <h3>What is a Popl?</h3>
        <hr />
        <p>
          <a href="www.popl.co">Popl</a> is Y-Combinator funded startup which
          sells what could be described as a digital business card - it is a way to share your details simply and efficiently.
        </p>{" "}
        <p>
          Popl is the best way to use AMIT as it doesn't require the
          paramedic or doctor to unlock a loved-one's phone or ask their for your ID.
          (Remember that information can only be accessed by registered and
          approved medical professionals.)
        </p>
        <p>
          We have a special deal with Popl and if you click on this link you can
          get 30% off your Popl order.
        </p>{" "}
        <h4 className="mt-5 mb-3">
          Please take a look at this video to see what Popl is and how it works:
        </h4>{" "}
        <iframe
          title="popl"
          width="90%"
          height="500"
          src="https://www.youtube.com/embed/Acl7JnRFxzI"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    );
  }
}

export default Popl;
