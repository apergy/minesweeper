import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Redirect, useParams } from "react-router-dom";

import Game from "../components/Game";
import { useGameState } from "../components/StateProvider";
import AddPlayerToGame from "../components/AddPlayerToGame";

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

const GameContainer = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_GAME, {
    variables: { id: params.gameId },
  });
  const { game, setGame, player } = useGameState();

  useEffect(() => {
    if (data && data.game) {
      setGame(data.game);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || error) {
    return <Redirect to="/" />;
  }

  if (!player) {
    return <AddPlayerToGame />;
  }

  return <Game />;
};

export default React.memo(GameContainer);
