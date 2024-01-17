import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createRoot } from "react-dom/client";
import App from "./App";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://nbaql-staging.up.railway.app/", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
