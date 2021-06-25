import React, { useState } from "react";
import { Button } from "reactstrap";

const PassFail = (props) => {
  /*
    onTeam
    passFail
    socket
    roll
    */

  const user = props.users.filter((user) => user.id == props.socket.id)[0];
  const [isPassing, setIsPassing] = useState();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const pass = () => {
    setIsPassing(true);
  };

  const fail = () => {
    setIsPassing(false);
  };

  const submit = () => {
    if (isPassing) {
      props.addToPass(user);
      setHasSubmitted(true);
    } else {
      props.addToFail(user);
      setHasSubmitted(true);
    }
  };

  return props.onTeam.filter((person) => person.id == props.socket.id).length ==
    1 ? (
    hasSubmitted ? (
      <h5>Waiting for team to vote...</h5>
    ) : (
      <>
        <Button onClick={pass} color="success">
          Pass
        </Button>{" "}
        {props.roll == "morgana" ||
        props.roll == "minion" ||
        props.roll == "mordred" ||
        props.roll == "oberon" ? (
          <>
            <Button onClick={fail} color="danger">
              Fail
            </Button>
            <br />
          </>
        ) : (
          <>
            <Button color="danger" disabled={true}>
              Fail
            </Button>
            <br />
          </>
        )}
        {isPassing != undefined ? (
          <Button
            style={{ marginTop: "0.5em" }}
            color={isPassing ? "success" : "danger"}
            onClick={submit}
          >
            {isPassing ? "Submit pass" : "Submit fail"}
          </Button>
        ) : null}
      </>
    )
  ) : null;
};

export default PassFail;
