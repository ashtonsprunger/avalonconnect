import React, { useEffect, useState } from "react";
import Qs from "querystring";
import { useParams } from "react-router-dom";

const Game = () => {
  const [username, setUsername] = useState(useParams().username.toUpperCase());
  const [room, setRoom] = useState(useParams().room.toUpperCase());

  useEffect(() => {}, []);

  return (
    <h1>
      Game Component, {username} in room {room}
    </h1>
  );
};

export default Game;
