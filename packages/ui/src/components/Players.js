import React from "react";

import { useGameState } from "./StateProvider";

const Players = () => {
  const { game, player } = useGameState();

  return (
    <div>
      <h3>Players</h3>
      {game.players.edges.map((p, i) => {
        return (
          <p key={i} className={p.node.id === player.id ? "you" : ""}>
            {p.node.name} ({p.score})
          </p>
        );
      })}
    </div>
  );
};

export default React.memo(Players);
