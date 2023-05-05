import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Main from "./Main";
function App() {
  const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}
export default App;
