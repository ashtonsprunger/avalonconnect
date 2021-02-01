import React from "react";
import { Button } from "reactstrap";

const Team = (props) => {
  const userInUsers = (user, users) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === user.id) {
        return [true, i];
      }
    }
    return [false, -1];
  };

  const toggleOnTeam = (user) => {
    if (props.socket.id === props.king.id) {
      if (userInUsers(user, props.onTeam)[0]) {
        props.changeOnTeam(
          props.onTeam.filter((person) => person.id !== user.id)
        );
      } else if (
        props.gameInfo.teams[props.currentMission - 1] > props.onTeam.length
      ) {
        props.changeOnTeam([...props.onTeam, user]);
      }
    }
  };

  return (
    <div>
      {props.king.id === props.socket.id ? (
        <>
          <h2>YOU ARE THE KING</h2>
        </>
      ) : (
        <h2>{props.king.username} IS THE KING</h2>
      )}
      <h5>
        {props.gameInfo.teams[props.currentMission - 1]} people on this team
      </h5>
      {props.users.map((user) => (
        <h2
          style={
            userInUsers(user, props.onTeam)[0]
              ? {
                  backgroundColor: "grey",
                  color: "white",
                }
              : {}
          }
          onClick={() => toggleOnTeam(user)}
        >
          {user.username}
        </h2>
      ))}
      {props.gameInfo.teams[props.currentMission - 1] == props.onTeam.length &&
      props.socket.id === props.king.id ? (
        <Button>Call for a vote</Button>
      ) : null}
    </div>
  );
};

export default Team;
