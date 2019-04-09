import React from "react";
import { Query } from "react-apollo";
import CircularProgress from "@material-ui/core/CircularProgress";
import gql from "graphql-tag";
import MessageList from "./MessageList";

const MESSAGES = gql`
  query {
    getMessage {
      to
      from
      message
    }
  }
`;

class GetMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { to, from } = this.props;
    return (
      <Query query={MESSAGES}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <CircularProgress />;
          if (error) return `Error!: ${error}`;
          return (
            <MessageList
              messages={data.getMessage}
              subscribeToMore={subscribeToMore}
              to={to}
              from={from}
            />
          );
        }}
      </Query>
    );
  }
}

export default GetMessages;
