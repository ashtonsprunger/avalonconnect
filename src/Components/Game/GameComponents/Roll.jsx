import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

const Roll = (props) => {
  useEffect(() => {}, []);

  return (
    <div>
      <h3>
        {props.roll === "servant"
          ? "You are a loyal servant of Arthur"
          : props.roll === "percival"
          ? "You are Percival"
          : props.roll === "merlin"
          ? "You are Merlin"
          : props.roll === "minion"
          ? "You are a minion of Mordred"
          : props.roll === "morgana"
          ? "You are Morgana"
          : props.roll === "mordred"
          ? "You are Mordred"
          : props.roll === "oberon"
          ? "You are Oberon"
          : null}
      </h3>
      <br />

      {props.sees ? (
        props.sees.length != 0 ? (
          <>
            <h4>you see:</h4>
            <br />
          </>
        ) : null
      ) : null}

      {props.sees
        ? props.sees.map((person) => (
            <>
              <h4>{person}</h4>
              <br />
            </>
          ))
        : null}
      <Button onClick={() => props.newRender("team")}>Done</Button>
    </div>
  );
};

export default Roll;
