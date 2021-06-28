import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

import LastRound from "./LastRound";
import PassFail from "./PassFail";
import Missions from "./Missions";

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
      } else {
        props.setPassFail(true);
        props.setLastRound({
          king: props.king,
          onTeam: props.onTeam,
          rejectedPeople: props.rejectedPeople,
          acceptedPeople: props.acceptedPeople,
        });
      }
    }
  }, [props.displayVote, props.voting]);

  useEffect(() => {
    console.log(`Here is the displayVote: ${props.displayVote}`);
  }, [props.displayVote]);

  useEffect(() => {
    if (
      props.onTeam.length > 0 &&
      props.passesFails.length == props.onTeam.length &&
      props.king.id == props.socket.id
    ) {
      let passes = 0;
      let fails = 0;
      let passed;
      for (let i = 0; i < props.passesFails.length; i++) {
        if (props.passesFails[i]) {
          passes++;
        } else {
          fails++;
        }
      }
      if (props.gameInfo.twoFails && props.currentMission == 4) {
        if (fails < 2) {
          passed = true;
        } else {
          passed = false;
        }
      } else {
        if (fails == 0) {
          passed = true;
        } else {
          passed = false;
        }
      }
      props.addMission(passed, props.currentMission);
      //! Left off here
      props.nextKing();
      // props.newPassFail(false);
      console.log("addMission", passed, props.currentMission);
    }
  }, [props.passesFails]);

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
    if (props.socket.id === props.king.id && !props.voting && !props.passFail) {
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
          <h2 style={{ color: "#007bff" }}>YOU ARE THE KING</h2>
        </>
      ) : (
        <h2>{props.king.username} IS THE KING</h2>
      )}
      <Missions
        currentMission={props.currentMission}
        missions={props.missions}
        gameInfo={props.gameInfo}
      />
      {props.gameInfo.twoFails && props.currentMission == 4 ? (
        <h5 style={{ color: "#dc3545" }}>
          This mission requires 2 fails to fail
        </h5>
      ) : null}
      {props.users.map((user) => (
        <h3
          style={
            userInUsers(user, props.onTeam)[0]
              ? user.id == props.socket.id
                ? {
                    backgroundColor: "#007bff",
                    color: "white",
                  }
                : {
                    backgroundColor: "#6c757d",
                    color: "white",
                  }
              : user.id == props.socket.id
              ? {
                  color: "#007bff",
                }
              : {}
          }
          onClick={() => toggleOnTeam(user)}
        >
          {user.username}
        </h3>
      ))}
      <br />
      <h5
        style={{
          color:
            props.voting == true
              ? props.acceptedPeople.filter(
                  (item) => item.id == props.socket.id
                ).length == 1
                ? "#218838"
                : props.rejectedPeople.filter(
                    (item) => item.id == props.socket.id
                  ).length == 1
                ? "#dc3545"
                : null
              : props.acceptedPeople.filter(
                  (item) => item.id == props.socket.id
                ).length == 1
              ? "#218838"
              : props.rejectedPeople.filter(
                  (item) => item.id == props.socket.id
                ).length == 1
              ? "#dc3545"
              : props.displayVote
              ? "#ffc107"
              : null,
        }}
      >
        {props.voting == true
          ? props.acceptedPeople.filter((item) => item.id == props.socket.id)
              .length == 1
            ? "You are approving..."
            : props.rejectedPeople.filter((item) => item.id == props.socket.id)
                .length == 1
            ? "You are rejecting..."
            : null
          : props.acceptedPeople.filter((item) => item.id == props.socket.id)
              .length == 1
          ? "You approved"
          : props.rejectedPeople.filter((item) => item.id == props.socket.id)
              .length == 1
          ? "You rejected"
          : props.displayVote
          ? "You didn't vote"
          : null}
      </h5>
      {props.passFail == true ? (
        props.onTeam.filter((person) => person.id == props.socket.id).length ==
        1 ? (
          <h5>You are on the team</h5>
        ) : (
          <h5>Waiting for team to vote...</h5>
        )
      ) : null}
      {props.passFail ? (
        <PassFail
          onTeam={props.onTeam}
          roll={props.roll}
          passFail={props.passFail}
          socket={props.socket}
          users={props.users}
          addToPass={props.addToPass}
          addToFail={props.addToFail}
        />
      ) : null}
      {props.gameInfo.teams[props.currentMission - 1] == props.onTeam.length &&
      props.socket.id === props.king.id &&
      !props.voting &&
      !props.displayVote ? (
        <Button onClick={callVote}>Call for a vote</Button>
      ) : null}
      {props.voting ? (
        <>
          <Button color="success" onClick={handleAccept}>
            APPROVE
          </Button>{" "}
          <Button color="danger" onClick={handleReject}>
            REJECT
          </Button>
        </>
      ) : null}
      <br />

      <LastRound
        lastRound={props.lastRound}
        missions={props.missions}
        currentMission={props.currentMission}
        gameInfo={props.gameInfo}
        passesFails={props.passesFails}
        passFail={props.passFail}
      />
    </div>
  );
};

export default Team;
