import React from "react";
import { Button } from "reactstrap";

const LastRound = (props) => {
  return (
    <>
      <br />
      <br />
      <br />
      {props.lastRound ? (
        <>
          <h4>The last king was {props.lastRound.king.username}</h4>
          <h5>On the team:</h5>
          {props.lastRound.onTeam.map((person) => {
            return <p>{person.username}</p>;
          })}
          <h5>Accepted:</h5>
          {props.lastRound.acceptedPeople.map((person) => {
            return <p>{person.username}</p>;
          })}
          <h5>Rejected:</h5>
          {props.lastRound.rejectedPeople.map((person) => {
            return <p>{person.username}</p>;
          })}
        </>
      ) : (
        "No last round!"
      )}
    </>
  );
};

export default LastRound;
