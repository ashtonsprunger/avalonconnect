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
  const [host, setHost] = useState(useParams().host === "true" ? true : false);
  const [render, setRender] = useState("waiting");
  const [roll, setRoll] = useState();
  const [sees, setSees] = useState();

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

    socket.on("charReveal", ({ roll, sees }) => {
      setSees(sees);
      setRoll(roll);
      console.log("roll, sees:", roll, sees);
    });
  }, []);

  const newRender = (newR) => {
    setRender(newR);
  };

  const changeRender = (newR) => {
    setRender(newR);
    socket.emit("changeRender", newR);
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
        <Team />
      ) : render === "roll" ? (
        <Roll newRender={newRender} roll={roll} sees={sees} socket={socket} />
      ) : null}
    </div>
  );
};

export default Game;
