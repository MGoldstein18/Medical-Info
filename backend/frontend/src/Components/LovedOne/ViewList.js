import React from "react";

function ViewList(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.reg}</td>
      <td>{props.org}</td>
      <td>{props.date}</td>
      <td>{props.time}</td>
    </tr>
  );
}

export default ViewList;
