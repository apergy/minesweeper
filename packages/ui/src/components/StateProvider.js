import React, { useState, useContext } from "react";

const StateContext = React.createContext({
  game: null,
  setGame: () => {},
  player: null,
  setPlayer: () => {},
});

export const useGameState = () => useContext(StateContext);

const StateProvider = (props) => {
  const [game, setGame] = useState(null);
  const [player, setPlayer] = useState(null);

  return (
    <StateContext.Provider value={{ game, setGame, player, setPlayer }}>
      {props.children}
    </StateContext.Provider>
  );
};

export default React.memo(StateProvider);
