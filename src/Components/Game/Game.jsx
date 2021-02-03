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
  const [gameInfo, setGameInfo] = useState();
  const [currentMission, setCurrentMission] = useState(1);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    // socket = io("avalonconnect-server.herokuapp.com"); //! FOR HEROKU
    socket = io("localhost:3333"); //! FOR LOCAL
    console.log("SOCKET", socket);

    //! joining the game room
    socket.emit("joinRoom", { room, username });

    socket.on("roomUsers", ({ room, users }) => {
      setUsers(users);
    });

    socket.on("newRender", newRender);
    socket.on("newKing", newKing);
    socket.on("newOnTeam", newOnTeam);

    socket.on("charReveal", ({ roll, sees }) => {
      setSees(sees);
      setRoll(roll);
      console.log("roll, sees:", roll, sees);
    });
    socket.on("gameInfo", setGameInfo);
    socket.on("callVote", () => setVoting(true));
  }, []);

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

  const changeRender = (newR) => {
    setRender(newR);
    socket.emit("changeRender", newR);
  };

  const newKing = (newK) => {
    setKing(newK);
  };

  const changeKing = (newK) => {
    setKing(newK);
    socket.emit("changeKing", newK);
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
          king={king}
          socket={socket}
          users={users}
          gameInfo={gameInfo}
          currentMission={currentMission}
          voting={voting}
          setVoting={setVoting}
        />
      ) : render === "roll" ? (
        <Roll newRender={newRender} roll={roll} sees={sees} socket={socket} />
      ) : null}
    </div>
  );
};

export default Game;
