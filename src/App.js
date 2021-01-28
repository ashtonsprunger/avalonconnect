import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import queryString from "querystring";
import io from "socket.io-client";

let socket;

const App = () => {
  // const socketRef = useRef();
  const [count, setCount] = useState();

  useEffect(() => {
    socket = io("avalonconnect-server.herokuapp.com");
    // socket.emit("here");
    console.log("SOCKET", socket);

    socket.on("count", (count) => {
      setCount(count);
    });
  }, []);

  return <div className="App">{count}</div>;
};

export default App;
