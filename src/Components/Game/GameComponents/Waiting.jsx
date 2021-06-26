import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import qrCode from "qrcode";

const Waiting = (props) => {
  const [percivalMorgana, setPercivalMorgana] = useState(true);
  const [oberon, setOberon] = useState(true);
  const [qrUrl, setQrUrl] = useState("");

  const generateQr = async () => {
    const response = await qrCode.toDataURL(
      `https://avalonconnect.herokuapp.com/join/${props.room}`
    );
    setQrUrl(response);
  };

  useEffect(() => {
    props.socket.on("roomUsers", ({ room, users }) => {
      props.setUsers(users);
    });
    generateQr();
  }, []);

  useEffect(() => {
    console.log(qrUrl);
  }, [qrUrl]);

  const startGame = () => {
    props.socket.emit("startGame", {
      percivalMorgana: percivalMorgana,
      oberon: oberon,
    });
    props.changeRender("team");
    // props.setRollOpen
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
        <h5>waiting for host to start game...</h5>
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
          </Button>{" "}
          <Button
            style={{ backgroundColor: "green" }}
            onClick={handleOberonClick}
          >
            Oberon
          </Button>
          <br />
          <br />
          <Button onClick={startGame}>START GAME</Button>
        </>
      ) : null}
      <br />
      {qrUrl ? <img src={qrUrl} /> : null}
    </div>
  );
};

export default Waiting;
