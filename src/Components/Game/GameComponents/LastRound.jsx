import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

const LastRound = (props) => {
  const [passesFails, setPassesFails] = useState([]);
  useEffect(() => {
    if (!props.passFail) {
      setPassesFails(props.passesFails);
    }
  }, [props.passFail]);

  return (
    <>
      <br />
      <br />
      <br />
      {props.lastRound ? (
        <>
          <h5>
            {passesFails.length > 0
              ? `${
                  passesFails.includes(true)
                    ? passesFails.filter((item) => item).length
                    : 0
                } ${
                  passesFails.filter((item) => item).length == 1
                    ? "pass"
                    : "passes"
                }, ${
                  passesFails.includes(false)
                    ? passesFails.filter((item) => !item).length
                    : 0
                } ${
                  passesFails.filter((item) => !item).length == 1
                    ? "fail"
                    : "fails"
                }`
              : null}
          </h5>

          <h4>The last king was {props.lastRound.king.username}</h4>
          <h5>On the team:</h5>
          {props.lastRound.onTeam.map((person) => {
            return <p>{person.username}</p>;
          })}
          <h5>Approved:</h5>
          {props.lastRound.acceptedPeople.map((person) => {
            return <p>{person.username}</p>;
          })}
          <h5>Rejected:</h5>
          {props.lastRound.rejectedPeople.map((person) => {
            return <p>{person.username}</p>;
          })}
        </>
      ) : null}
    </>
  );
};

export default LastRound;
