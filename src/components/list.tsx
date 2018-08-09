
import { Component } from 'react';
import * as React from "react";
import gql from 'graphql-tag';
import { Query, graphql, compose } from 'react-apollo';;

const HELLO = gql`
  {
    hello
  }
`;

interface IProps {
  hello?: any
}

@compose(
  graphql(HELLO, {
    name: "hello"
  })
)
export default class Index extends Component<IProps, {}> {
  render() {
    const { hello } = this.props;
    console.log(hello);

    return <div >
      {hello.hello}
    </div>;
  }
}
