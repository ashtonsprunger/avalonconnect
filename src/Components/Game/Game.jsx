import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import io from "socket.io-client";
import "./Game.css";

import Waiting from "./GameComponents/Waiting";

let socket;

const Game = () => {
  const [username, setUsername] = useState(useParams().username.toUpperCase());
  const [room, setRoom] = useState(useParams().room.toUpperCase());
  const [users, setUsers] = useState([]);
  const [host, setHost] = useState(useParams().host === "true" ? true : false);
  const [render, setRender] = useState("waiting");

  useEffect(() => {
    socket = io("avalonconnect-server.herokuapp.com"); //! FOR HEROKU
    // socket = io("localhost:3333"); //! FOR LOCAL
    console.log("SOCKET", socket);

    //! joining the game room
    socket.emit("joinRoom", { room, username });

    socket.on("roomUsers", ({ room, users }) => {
      setUsers(users);
    });
  }, []);

  const changeRender = (newRender) => {
    setRender(newRender);
  };

  return (
    <div className="gameWrapper">
      {render === "waiting" ? (
        socket ? (
          <Waiting
            changeRender={changeRender}
            host={host}
            room={room}
            users={users}
            setUsers={setUsers}
            socket={socket}
          />
        ) : null
      ) : render === "team" ? (
        <h2>TEAM</h2>
      ) : null}
    </div>
  );
};

export default Game;
