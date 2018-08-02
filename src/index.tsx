import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ApolloProvider } from "react-apollo";
import { client } from "./store/apollo";
import List from "./components/list";

interface IProps {
  name?: any
}
class Index extends Component<IProps, {}> {
  render() {
    return <List />
  }
}

ReactDOM.render(
    <ApolloProvider client={client}>
      <Index />
    </ApolloProvider>,
  document.querySelector("#app")
);
