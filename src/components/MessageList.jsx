import React from "react";
import gql from "graphql-tag";
import { TextField } from "@material-ui/core";

const CHAT_CHANNEL = gql`
  subscription {
    messageAdded {
      to
      from
      message
    }
  }
`;

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { subscribeToMore } = this.props;
    subscribeToMore({
      document: CHAT_CHANNEL,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          getMessage: [...prev.getMessage, subscriptionData.data.messageAdded]
        };
      }
    });
  }
  componentDidUpdate() {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    const { messages, to, from } = this.props;
    return (
      <div style={{ height: "350px", overflowX: "hidden" }} className="listChats">
        {messages.map(message => {
          if (message) {
            if (message.to === to && message.from === from) {
              return (
                <div style={{ textAlign: "end" }}>
                  <TextField
                    value={message.message}
                    label={from}
                    multiline
                    margin="normal"
                    variant="outlined"
                    readOnly
                  />
                </div>
              );
            }
            if (message.to === from && message.from === to) {
              return (
                <div>
                  <TextField
                    value={message.message}
                    label={to}
                    multiline
                    margin="normal"
                    variant="outlined"
                    readOnly
                  />
                </div>
              );
            }
          }
        })}

        <div
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}
export default MessageList;
