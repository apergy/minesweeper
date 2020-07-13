import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import CreateGame from "./components/CreateGame";
import GameContainer from "./containers/GameContainer";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/:gameId">
          <GameContainer />
        </Route>
        <Route path="/" exact>
          <CreateGame />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
