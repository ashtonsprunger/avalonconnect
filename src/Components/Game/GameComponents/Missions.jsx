import React from "react";
import { Button } from "reactstrap";

const Missions = (props) => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index) => {
        return (
          <>
            <Button
              color={
                index == props.currentMission - 1
                  ? "primary"
                  : props.missions[index] == undefined
                  ? "secondary"
                  : props.missions[index]
                  ? "success"
                  : "danger"
              }
              style={{
                color: index == 3 && props.gameInfo.twoFails ? "black" : "",
              }}
            >
              {props.gameInfo.teams[index]}
            </Button>{" "}
          </>
        );
      })}
      <br />
      <br />
    </>
  );
};

export default Missions;
