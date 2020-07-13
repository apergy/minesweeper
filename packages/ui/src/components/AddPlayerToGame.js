import React, { useState } from "react";
import { useGameState } from "./StateProvider";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_PLAYER = gql`
  mutation CreatePlayer($name: String!) {
    createPlayer(name: $name) {
      id
      name
    }
  }
`;

const ADD_PLAYER_TO_GAME = gql`
  mutation AddPlayerToGame($gameId: ID!, $playerId: ID!) {
    addPlayerToGame(gameId: $gameId, playerId: $playerId) {
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

const AddPlayerToGame = () => {
  const [name, setName] = useState(null);
  const { game, setPlayer, setGame } = useGameState();

  const [createPlayer] = useMutation(CREATE_PLAYER);
  const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="Your name..."
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button
        disabled={!name}
        onClick={async () => {
          const playerResult = await createPlayer({ variables: { name } });
          const gameResult = await addPlayerToGame({
            variables: {
              gameId: game.id,
              playerId: playerResult.data.createPlayer.id,
            },
          });
          setPlayer(playerResult.data.createPlayer);
          setGame(gameResult.data.addPlayerToGame);
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default React.memo(AddPlayerToGame);
