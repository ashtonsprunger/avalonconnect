import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import "./Join.css";

const Join = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      <Form>
        <h2>Join a Game</h2>
        <FormGroup className="formGroup">
          <Label>
            NAME
            <Input
              className="joinUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter name..."
            />
          </Label>
        </FormGroup>
        <FormGroup className="formGroup">
          <Label>
            GAME CODE
            <Input
              className="joinRoom"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter game code..."
            />
          </Label>
        </FormGroup>
        <Link
          onClick={(e) =>
            !room || !username
              ? e.preventDefault()
              : room.length == 4
              ? null
              : (alert("GAME CODE MUST BE 4 DIGITS!!"), e.preventDefault())
          }
          to={`/game/${username}/${room}`}
        >
          JOIN!
        </Link>
      </Form>
    </div>
  );
};

export default Join;
