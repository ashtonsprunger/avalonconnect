import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

const Waiting = (props) => {
  const [percivalMorgana, setPercivalMorgana] = useState(true);
  const [oberon, setOberon] = useState(true);

  useEffect(() => {
    props.socket.on("roomUsers", ({ room, users }) => {
      props.setUsers(users);
    });
  }, []);

  const startGame = () => {
    props.socket.emit("startGame", {
      percivalMorgana: percivalMorgana,
      oberon: oberon,
    });
    props.changeRender("roll");
  };

  const handlePercivalMorganaClick = (e) => {
    if (percivalMorgana) {
      setPercivalMorgana(false);
      e.target.style.backgroundColor = "#6c757d";
    } else {
      setPercivalMorgana(true);
      e.target.style.backgroundColor = "green";
    }
  };

  const handleOberonClick = (e) => {
    if (oberon) {
      setOberon(false);
      e.target.style.backgroundColor = "#6c757d";
    } else {
      setOberon(true);
      e.target.style.backgroundColor = "green";
    }
  };

  return (
    <div className="gameWrapper">
      <h1 class="room">{props.room}</h1>
      {props.host ? (
        <h5 className="hosting">you are hosting</h5>
      ) : (
        <h5>waiting for host to begin game...</h5>
      )}
      {props.users.map((user) => {
        return (
          <h2
            style={{
              color: `${props.socket.id == user.id ? "blue" : "black"}`,
            }}
          >
            {user.username}
          </h2>
        );
      })}
      {props.host ? (
        <>
          <Button
            style={{ backgroundColor: "green" }}
            onClick={handlePercivalMorganaClick}
          >
            Percival/Morgana
          </Button>
          <Button
            style={{ backgroundColor: "green" }}
            onClick={handleOberonClick}
          >
            Oberon
          </Button>
          <Button onClick={startGame}>START GAME</Button>
        </>
      ) : null}
    </div>
  );
};

export default Waiting;
