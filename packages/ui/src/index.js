import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import "./index.css";
import App from "./App";
import StateProvider from "./components/StateProvider";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
