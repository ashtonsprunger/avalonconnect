import React from "react";
import { Link } from "react-router-dom";

const Loading = () => {
  return (
    <div>
      <div className="nav">
        <Link to="/">Exit</Link>
      </div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
