import React, { useState } from "react";
import gql from "graphql-tag";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { useGameState } from "./StateProvider";

const CREATE_GAME = gql`
  mutation CreateGame($width: Int!, $height: Int!) {
    createGame(width: $width, height: $height) {
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

const CreateGame = () => {
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(16);

  const { game, setGame } = useGameState();
  const [createGame] = useMutation(CREATE_GAME);

  if (game) {
    return <Redirect to={`/${game.id}`} />;
  }

  return (
    <div>
      <input
        type="number"
        placeholder="width"
        name="width"
        value={width}
        onChange={(event) => setWidth(parseInt(event.target.value))}
      />
      {" x "}
      <input
        type="number"
        placeholder="height"
        name="height"
        value={height}
        onChange={(event) => setHeight(parseInt(event.target.value))}
      />
      <br />
      <button
        onClick={async () => {
          const result = await createGame({
            variables: { width, height },
          });
          setGame(result.data.createGame);
        }}
        disabled={!(width && height)}
      >
        Create game
      </button>
    </div>
  );
};

export default React.memo(CreateGame);
