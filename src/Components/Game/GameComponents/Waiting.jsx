import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import qrCode from "qrcode";

const Waiting = (props) => {
  const [percivalMorgana, setPercivalMorgana] = useState(true);
  const [oberon, setOberon] = useState(true);
  const [qrUrl, setQrUrl] = useState("");

  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  }

  const moveUp = (index) => {
    props.rearrange(array_move(props.users, index, index + 1));
  };

  const moveDown = (index) => {
    props.rearrange(array_move(props.users, index, index - 1));
  };

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
      usersP: props.users,
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
      {props.users.map((user, index) => {
        return (
          <h3
            style={{
              color: `${props.socket.id == user.id ? "#007bff" : "black"}`,
            }}
          >
            {user.username}{" "}
            {props.host ? (
              <span>
                {index > 0 ? (
                  <Button onClick={() => moveDown(index)}>^</Button>
                ) : null}
              </span>
            ) : null}
          </h3>
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
          <br />
        </>
      ) : null}
      {qrUrl ? <img src={qrUrl} /> : null}
    </div>
  );
};

export default Waiting;
