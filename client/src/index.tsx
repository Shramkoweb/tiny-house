import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { Listings } from "./sections";

const client = new ApolloClient({
  uri: "http://localhost:9000/api"
});

render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Listings title='Tiny House'/>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
