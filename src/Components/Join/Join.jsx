import React, { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import "./Join.css";

const Join = (props) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(useParams().room);

  useEffect(() => {
    if(username){
      window.localStorage.setItem('username', username)
    }
  }, [username])

  useEffect(() => {
    if(window.localStorage.getItem('username') != ''){
      setUsername(window.localStorage.getItem('username'))
    }
    // if(useParams().room){
    //   setRoom(useParams().room)
    // }
  }, [])

  const handleNameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="joinWrapper">
      <Form onSubmit={handleSubmit}>
        <h2>Join a Game</h2>
        <FormGroup className="formGroup">
          <Label>
            NAME
            <Input
              className="joinUsername"
              value={username}
              onChange={handleNameChange}
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
          className="joinGame"
          onClick={(e) =>
            !room || !username
              ? e.preventDefault()
              : room.length == 4
              ? null
              : (alert("GAME CODE MUST BE 4 DIGITS!!"), e.preventDefault())
          }
          to={`/game/${username}/${room}/false`}
        >
          JOIN
        </Link>
      </Form>
      <Link to="/host">host a game</Link>
    </div>
  );
};

export default Join;
