import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import "./Host.css";

const Host = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(makeid(4));

  function makeid(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2>Host a Game</h2>
        <FormGroup className="formGroup">
          <Label>
            NAME
            <Input
              className="hostUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter name..."
              required
            />
          </Label>
        </FormGroup>
        <Link
          className="hostGame"
          onClick={(e) =>
            !room || !username
              ? e.preventDefault()
              : room.length == 4
              ? null
              : (alert("Error!"), e.preventDefault())
          }
          to={`/game/${username}/${room}/true`}
        >
          HOST
        </Link>
      </Form>
      <Link to="/join">join a game</Link>
    </div>
  );
};

export default Host;
