import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import io from "socket.io-client";
import "./Game.css";

import Waiting from "./GameComponents/Waiting";
import Team from "./GameComponents/Team";
import Roll from "./GameComponents/Roll";

let socket;

const Game = () => {
  const [username, setUsername] = useState(useParams().username.toUpperCase());
  const [room, setRoom] = useState(useParams().room.toUpperCase());
  const [users, setUsers] = useState([]);
  const [rollOpen, setRollOpen] = useState(true);
  const [host, setHost] = useState(useParams().host === "true" ? true : false);
  const [render, setRender] = useState("waiting");
  const [roll, setRoll] = useState();
  const [sees, setSees] = useState();
  const [king, setKing] = useState();
  const [onTeam, setOnTeam] = useState([]);
  const [acceptedPeople, setAcceptedPeople] = useState([]);
  const [rejectedPeople, setRejectedPeople] = useState([]);
  const [gameInfo, setGameInfo] = useState();
  const [currentMission, setCurrentMission] = useState(1);
  const [missions, setMissions] = useState([]);
  const [voting, setVoting] = useState(false);
  const [displayVote, setDisplayVote] = useState(false);
  const [kingStarted, setKingStarted] = useState(false);
  const [passFail, setPassFail] = useState(false);
  const [passesFails, setPassesFails] = useState([]);
  const [lastRound, setLastRound] = useState();

  useEffect(() => {
    socket = io("avalonconnect-server.herokuapp.com"); //! FOR HEROKU
    // socket = io("localhost:3333"); //! FOR LOCAL
    console.log("SOCKET", socket);

    //! joining the game room
    socket.emit("joinRoom", { room, username });

    socket.on("roomUsers", ({ room, users }) => {
      setUsers(users);
    });

    socket.on("newRender", newRender);
    socket.on("newKing", newKing);
    socket.on("newOnTeam", newOnTeam);
    socket.on("newAcceptedRejected", newAcceptedRejected);
    socket.on("newPassFail", setPassesFails);
    socket.on("newPassFailSingle", setPassFail);

    socket.on("showVote", showVote);

    socket.on("charReveal", ({ roll, sees }) => {
      setSees(sees);
      setRoll(roll);
      console.log("roll, sees:", roll, sees);
    });
    socket.on("gameInfo", setGameInfo);
    socket.on("callVote", callVote);
    socket.on("voting", setVoting);
    socket.on("lastRound", setLastRound);
    socket.on("missions", setMissions);
    socket.on("currentMission", setCurrentMission);
  }, []);

  const callVote = () => {
    setKingStarted(true);
    setVoting(true);
  };

  const newRender = (newR) => {
    setRender(newR);
  };

  const newOnTeam = (newO) => {
    setOnTeam(newO);
  };

  const changeOnTeam = (newO) => {
    setOnTeam(newO);
    socket.emit("changeOnTeam", newO);
  };

  const newPassFail = (newPF) => {
    socket.emit(newPF);
  };

  const newAcceptedRejected = (newAR) => {
    setAcceptedPeople(newAR.accepted);
    setRejectedPeople(newAR.rejected);
  };

  const showVote = (show) => {
    setDisplayVote(show);
  };

  const addToRejected = (newR) => {
    // setRejectedPeople([...rejectedPeople, newR]);
    socket.emit("addToRejected", newR);
  };

  const addToAccepted = (newA) => {
    // setAcceptedPeople([...acceptedPeople, newA]);
    socket.emit("addToAccepted", newA);
  };

  const addToPass = (person) => {
    socket.emit("addToPass", person);
  };

  const addToFail = (person) => {
    socket.emit("addToFail", person);
  };

  const addMission = (passed, mission) => {
    socket.emit("mission", {
      passed,
      mission,
    });
  };

  const changeRender = (newR) => {
    setRender(newR);
    socket.emit("changeRender", newR);
  };

  const newKing = (newK) => {
    setKing(newK);
    console.log(`The new king is ${newK}`);
  };

  const changeKing = (newK) => {
    setKing(newK);
    socket.emit("changeKing", newK);
  };

  const nextKing = () => {
    socket.emit("lastRound", {
      king: king,
      onTeam: onTeam,
      rejectedPeople: rejectedPeople,
      acceptedPeople: acceptedPeople,
    });
    socket.emit("nextKing");
  };

  const toggleRoll = () => {
    setRollOpen(!rollOpen);
  };

  return (
    <div className="gameWrapper">
      {render !== "waiting" ? (
        <>
          <h2>
            <Button onClick={toggleRoll}>
              {rollOpen ? "GOT IT" : username.trim().toUpperCase()}
            </Button>
          </h2>
        </>
      ) : null}
      {render === "waiting" ? (
        socket ? (
          <Waiting
            changeRender={changeRender}
            host={host}
            room={room}
            users={users}
            setUsers={setUsers}
            socket={socket}
            setRollOpen={setRollOpen}
          />
        ) : null
      ) : rollOpen ? (
        <Roll newRender={newRender} roll={roll} sees={sees} socket={socket} />
      ) : render === "team" ? (
        <Team
          onTeam={onTeam}
          changeOnTeam={changeOnTeam}
          rejectedPeople={rejectedPeople}
          addToRejected={addToRejected}
          acceptedPeople={acceptedPeople}
          addToAccepted={addToAccepted}
          king={king}
          socket={socket}
          users={users}
          gameInfo={gameInfo}
          currentMission={currentMission}
          voting={voting}
          setVoting={setVoting}
          displayVote={displayVote}
          setDisplayVote={setDisplayVote}
          nextKing={nextKing}
          kingStarted={kingStarted}
          setKingStarted={setKingStarted}
          lastRound={lastRound}
          setLastRound={setLastRound}
          passFail={passFail}
          setPassFail={setPassFail}
          passesFails={passesFails}
          setPassesFails={setPassesFails}
          roll={roll}
          addToPass={addToPass}
          addToFail={addToFail}
          addMission={addMission}
          missions={missions}
          newPassFail={newPassFail}
        />
      ) : render === "roll" ? (
        <Roll newRender={newRender} roll={roll} sees={sees} socket={socket} />
      ) : render == "merlin" ? (
        <>merlin</>
      ) : render == "results" ? (
        <>results</>
      ) : null}
    </div>
  );
};

export default Game;
