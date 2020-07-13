import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useGameState } from "./StateProvider";

const PLAYER_MOVE = gql`
  mutation PlayerMove($gameId: ID!, $playerId: ID!, $x: Int!, $y: Int!) {
    playerMove(gameId: $gameId, playerId: $playerId, x: $x, y: $y) {
      id
      status
      players {
        edges {
          score
          node {
            id
            name
          }
        }
      }
      raw
      moves
    }
  }
`;

const GameGrid = () => {
  const [playerMove] = useMutation(PLAYER_MOVE);
  const { game, player, setGame } = useGameState();

  return (
    <table>
      {game.raw.map((row, i) => {
        return (
          <tr key={i}>
            {row.map((col, j) => {
              if (game.moves[i][j]) {
                return (
                  <td className={`moved ${col === 9 ? "mine" : ""}`} key={j}>
                    {col}
                  </td>
                );
              }
              return (
                <td
                  key={j}
                  onClick={async () => {
                    const moveResult = await playerMove({
                      variables: {
                        gameId: game.id,
                        playerId: player.id,
                        x: i,
                        y: j,
                      },
                    });
                    setGame(moveResult.data.playerMove);
                  }}
                >
                  <button>&nbsp;</button>
                </td>
              );
            })}
          </tr>
        );
      })}
    </table>
  );
};

export default GameGrid;
