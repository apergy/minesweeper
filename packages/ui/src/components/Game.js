import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useApolloClient } from "@apollo/react-hooks";

import "./Game.css";
import Players from "./Players";
import GameGrid from "./GameGrid";
import { useGameState } from "./StateProvider";

const GET_GAME = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
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

const Game = () => {
  const client = useApolloClient();
  const { game, setGame } = useGameState();

  useEffect(() => {
    const interval = setInterval(() => {
      client
        .query({
          query: GET_GAME,
          fetchPolicy: "network-only",
          variables: { id: game.id },
        })
        .then(({ data }) => {
          if (data) {
            setGame(data.game);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="game">
      <div className="game__grid">
        <GameGrid />
      </div>
      <div className="game__players">
        <Players />
      </div>
    </div>
  );
};

export default React.memo(Game);
