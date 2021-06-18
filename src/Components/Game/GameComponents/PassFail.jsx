import React, { useState } from "react";
import { Button } from "reactstrap";

const PassFail = (props) => {
  /*
    onTeam
    passFail
    socket
    roll
    */

  const [isPassing, setIsPassing] = useState();

  const pass = () => {
    setIsPassing(true);
  };

  const fail = () => {
    setIsPassing(false);
  };

  const submit = () => {
    if (isPassing) {
      props.addToPass();
    } else {
      props.addToFail();
    }
  };

  return props.passFail &&
    props.onTeam.filter((person) => person.id == props.socket.id).length ==
      1 ? (
    <>
      <Button onClick={pass} color="success">
        Pass
      </Button>
      {props.roll == "morgana" ||
      props.roll == "minion" ||
      props.roll == "mordred" ||
      props.roll == "oberon" ? (
        <Button onClick={fail} color="danger">
          Fail
        </Button>
      ) : (
        <Button color="danger" disabled={true}>
          Fail
        </Button>
      )}
      {isPassing != undefined ? (
        <Button color="primary" onClick={submit}>
          Submit
        </Button>
      ) : null}
    </>
  ) : null;
};

export default PassFail;
