import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

import LastRound from "./LastRound";

const Team = (props) => {
  useEffect(() => {
    if (
      props.kingStarted &&
      props.voting == false &&
      props.displayVote == true
    ) {
      if (props.rejectedPeople.length >= props.acceptedPeople.length) {
        console.log("DISPLAY VOTE:", props.displayVote);
        props.setDisplayVote(false);
        console.log("DISPLAY VOTE:", props.displayVote);
        props.setKingStarted(false);
        if (props.king.id == props.socket.id) {
          props.nextKing();
        }
      }
    }
  }, [props.displayVote, props.voting]);

  useEffect(() => {
    console.log(`Here is the displayVote: ${props.displayVote}`);
  }, [props.displayVote]);

  const handleAccept = () => {
    if (!props.displayVote) {
      props.addToAccepted(
        props.users.filter((user) => user.id === props.socket.id)[0]
      );
    }
  };

  const handleReject = () => {
    if (!props.displayVote) {
      props.addToRejected(
        props.users.filter((user) => user.id === props.socket.id)[0]
      );
    }
  };

  const userInUsers = (user, users) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === user.id) {
        return [true, i];
      }
    }
    return [false, -1];
  };

  const callVote = () => {
    props.socket.emit("callVote");
    // props.setVoting(true);
    // props.setKingStarted(true);
  };

  const toggleOnTeam = (user) => {
    if (props.socket.id === props.king.id && !props.voting) {
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
      props.socket.id === props.king.id &&
      !props.voting &&
      !props.displayVote ? (
        <Button onClick={callVote}>Call for a vote</Button>
      ) : null}
      {props.voting ? (
        <>
          <Button color="success" onClick={handleAccept}>
            ACCEPT
          </Button>
          <Button color="danger" onClick={handleReject}>
            REJECT
          </Button>
        </>
      ) : null}
      {props.voting == true
        ? props.acceptedPeople.filter((item) => item.id == props.socket.id)
            .length == 1
          ? "You are accepting..."
          : props.rejectedPeople.filter((item) => item.id == props.socket.id)
              .length == 1
          ? "You are rejecting..."
          : null
        : props.acceptedPeople.filter((item) => item.id == props.socket.id)
            .length == 1
        ? "You accepted"
        : props.rejectedPeople.filter((item) => item.id == props.socket.id)
            .length == 1
        ? "You rejected"
        : props.displayVote
        ? "You didn't vote"
        : null}
      {props.displayVote ? (
        <>
          <h4>Accepted</h4>
          {props.acceptedPeople.length > 0
            ? props.acceptedPeople.map((person) => (
                <p>{person.username.toUpperCase()}</p>
              ))
            : "none"}
          <h4>Rejected</h4>
          {props.rejectedPeople.length > 0
            ? props.rejectedPeople.map((person) => (
                <p>{person.username.toUpperCase()}</p>
              ))
            : "none"}
        </>
      ) : props.voting ? (
        "counting down..."
      ) : null}
      <LastRound lastRound={props.lastRound} />
    </div>
  );
};

export default Team;
