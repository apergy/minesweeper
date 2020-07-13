const uuid = require("uuid");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const { MINE_VALUE } = require("./config");
const { createMinesweeper } = require("./minesweeper");
const {
  changeCellValue,
  getCellValue,
} = require("./minesweeper/helpers/cells");

const games = new Map();
const players = new Map();
const gamePlayers = new Map();

const typeDefs = gql`
  enum GameStatus {
    IN_PROGRESS
    FINISHED
  }

  type Game {
    id: ID!
    raw: [[Int!]!]!
    moves: [[ID]!]!
    players: GamePlayerConnection!
    status: GameStatus
  }

  type GamePlayerEdge {
    score: Int!
    node: Player!
  }

  type GamePlayerConnection {
    edges: [GamePlayerEdge!]!
  }

  type Player {
    id: ID!
    name: String!
  }

  type Query {
    game(id: ID!): Game!
    player(id: ID!): Player!
  }

  type Mutation {
    createGame(width: Int!, height: Int!): Game!
    createPlayer(name: String!): Player!
    addPlayerToGame(gameId: ID!, playerId: ID!): Game!
    playerMove(gameId: ID!, playerId: ID!, x: Int!, y: Int!): Game!
  }
`;

const resolvers = {
  Query: {
    game: (parent, args) => {
      return games.get(args.id);
    },
    player: (parent, args) => {
      return players.get(args.id);
    },
  },
  Game: {
    players: (parent) => {
      return {
        edges: gamePlayers.get(parent.id).map((playerId) => {
          return {
            node: resolvers.Query.player(null, { id: playerId }),
            score: parent.moves.reduce((acc, row, i) => {
              return (
                acc +
                row.filter((c, j) => {
                  return c === playerId && parent.raw[i][j] !== MINE_VALUE;
                }).length
              );
            }, 0),
          };
        }),
      };
    },
  },
  Mutation: {
    createGame: (parent, args) => {
      const newGame = createMinesweeper(args.height, args.width);
      games.set(newGame.id, newGame);
      gamePlayers.set(newGame.id, []);
      return resolvers.Query.game(null, { id: newGame.id });
    },
    createPlayer: (parent, args) => {
      const newPlayer = { id: uuid.v4(), name: args.name };
      players.set(newPlayer.id, newPlayer);
      return resolvers.Query.player(null, { id: newPlayer.id });
    },
    addPlayerToGame: (parent, args) => {
      const players = gamePlayers.get(args.gameId);
      const newPlayers = [...players, args.playerId];
      gamePlayers.set(args.gameId, newPlayers);
      const updatedGame = resolvers.Query.game(null, { id: args.gameId });
      return updatedGame;
    },
    playerMove: (parent, args) => {
      const game = resolvers.Query.game(null, { id: args.gameId });
      const updatedMoves = changeCellValue(
        game.moves,
        args.x,
        args.y,
        args.playerId
      );
      games.set(args.gameId, { ...game, moves: updatedMoves });
      const updatedGame = resolvers.Query.game(null, { id: args.gameId });

      const value = getCellValue(game.raw, args.x, args.y);

      if (value === MINE_VALUE) {
        games.set(args.gameId, { ...updatedGame, status: "FINISHED" });
        const finishedGame = resolvers.Query.game(null, { id: args.gameId });
        return finishedGame;
      }

      return updatedGame;
    },
  },
};

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen(8080);
