import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./Game.css";

let socket;

const Game = () => {
  const [username, setUsername] = useState(useParams().username.toUpperCase());
  const [room, setRoom] = useState(useParams().room.toUpperCase());
  const [users, setUsers] = useState([]);
  const [host, setHost] = useState(useParams().host === "true" ? true : false);

  useEffect(() => {
    socket = io("avalonconnect-server.herokuapp.com"); //! CHANGE BEFORE PUSHING
    // socket = io("localhost:3333");
    console.log("SOCKET", socket);

    //! joining the game room
    socket.emit("joinRoom", { room, username });

    socket.on("roomUsers", ({ room, users }) => {
      setUsers(users);
    });
  }, []);

  return (
    <div className="gameWrapper">
      <h1 class="room">{room}</h1>
      {host ? (
        <h5 className="hosting">you are hosting</h5>
      ) : (
        <h5>waiting for host to begin game...</h5>
      )}
      {users.map((user) => {
        return (
          <h2 style={{ color: `${socket.id == user.id ? "blue" : "black"}` }}>
            {user.username}
          </h2>
        );
      })}
    </div>
  );
};

export default Game;
