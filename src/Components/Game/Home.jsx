import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/logo192.png";

const Home = () => {
  return (
    <div className="wrapper">
      <div className="nav">
        <div>
          <h4>
            <img style={{ width: "35px" }} src={logoImage} /> Avalon
          </h4>
        </div>
        <Link to="/settings">Settings</Link>
      </div>
      <br />
      <Link className="homeMenuItem" to="/join">
        Join a Game
      </Link>
      <br />
      <br />
      <Link className="homeMenuItem" to="/host">
        Host a Game
      </Link>
    </div>
  );
};

export default Home;
