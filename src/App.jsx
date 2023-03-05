import "./App.css";
import { useState, useEffect } from "react";
import queryString from "querystring";
import {
  HashRouter as Router,
  Link,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./Components/Game/Home";
import Settings from "./Components/Game/Settings";
import Game from "./Components/Game/Game";
import Join from "./Components/Join/Join";
import Host from "./Components/Host/Host";

const App = () => {
  // const socketRef = useRef();
  const [inRoom, setInRoom] = useState(false);

  useEffect(() => {
    // socket = io("avalonconnect-server.herokuapp.com"); //! CHANGE BEFORE PUSHING
    // socket = io("localhost:3333");
    // socket.emit("here");
    // console.log("SOCKET:", socket);
    // socket.on("count", (count) => {
    //   setCount(count);
    // });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/join/:room">
            <Join />
          </Route>
          <Route exact path="/join">
            <Join />
          </Route>
          <Route exact path="/host">
            <Host />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/game/:username/:room/:host">
            <Game />
          </Route>
          <Route>
            <Redirect to="/join" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
