import React, { useState } from "react";
import { Input, Label, FormGroup, CustomInput } from "reactstrap";
import { Link } from "react-router-dom";

const Settings = () => {
  const [defaultName, setDefaultName] = useState(
    localStorage.getItem("username")
  );
  const [enterGame, setEnterGame] = useState(
    localStorage.getItem("enterGame") == "true" ? true : false
  );

  const handleDefaultNameChange = (e) => {
    setDefaultName(e.target.value);
    localStorage.setItem("username", e.target.value);
  };

  const handleEnterGameChange = (e) => {
    console.log("hello");
    setEnterGame(e.target.checked);
    localStorage.setItem("enterGame", e.target.checked);
  };

  return (
    <div style={{ padding: "1em" }}>
      <div className="nav">
        <Link className="back" to="/">
          Back
        </Link>
      </div>
      <h2>Settings</h2>
      <hr />
      <FormGroup>
        <Label>
          Default Name
          <Input
            style={{ textTransform: "uppercase" }}
            placeholder="enter default name..."
            value={defaultName}
            onChange={handleDefaultNameChange}
          />
        </Label>
      </FormGroup>
      <hr />
      <FormGroup>
        <Label for="enterGame">
          Automatically enter game after scanning QR code
        </Label>
        <CustomInput
          id="enterGame"
          type="switch"
          // value={enterGame}
          checked={enterGame}
          onChange={handleEnterGameChange}
        />
      </FormGroup>
    </div>
  );
};

export default Settings;
