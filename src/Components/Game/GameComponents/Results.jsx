import React, { useState } from "react";

const Results = (props) => {
  const [nums, setNums] = useState(["1ST", "2ND", "3RD", "4TH", "5TH"]);

  return (
    <>
      <h3>Characters</h3>
      {props.users.map((user) => {
        return (
          <h5
            style={{
              color:
                user.roll == "merlin" ||
                user.roll == "servant" ||
                user.roll == "percival"
                  ? "#218838"
                  : "#dc3545",
            }}
          >
            {user.username}:{" "}
            {user.roll == "merlin"
              ? "Merlin"
              : user.roll == "servant"
              ? "Loyal servant of Arthur"
              : user.roll == "minion"
              ? "Minion of Mordred"
              : user.roll == "percival"
              ? "Percival"
              : user.roll == "morgana"
              ? "Morgana"
              : user.roll == "mordred"
              ? "Mordred"
              : user.roll == "oberon"
              ? "Oberon"
              : "Unknown roll!! This is a bug!! You should never see this message!!!"}
          </h5>
        );
      })}
      <h3>Missions</h3>
      {props.missions.map((mission, index) => {
        return (
          <h4 style={{ color: mission ? "#218838" : "#dc3545" }}>{`${
            nums[index]
          } MISSION - ${mission ? "PASSED" : "FAILED"}`}</h4>
        );
      })}
    </>
  );
};

export default Results;
