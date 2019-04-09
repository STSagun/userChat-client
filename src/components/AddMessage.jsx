import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core";
import {
  TextField,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import Send from "@material-ui/icons/Send";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  style: {
    textDecoration: "none",
    color: "white"
  },
  textField: {
    width: "98%",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  }
});
const ADD_MESSAGE = gql`
  mutation addMessage($to: String!, $from: String!, $message: String!) {
    addMessage(to: $to, from: $from, message: $message) {
      to
      from
      message
    }
  }
`;

class AddMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }
  handlechange = field => event => {
    this.setState({
      [field]: event.target.value
    });
  };

  handleClick = (e, addMessage, to, from, message) => {
    e.preventDefault();
    addMessage({ variables: { to, from, message } });
    this.setState({
      message: ""
    });
  };

  render() {
    const { from, to, classes } = this.props;
    const { message } = this.state;

    return (
      <Mutation mutation={ADD_MESSAGE}>
        {(addMessage, { data }) => (
          <TextField
            value={message}
            label="Message"
            fullWidth
            className={classes.textField}
            onChange={this.handlechange("message")}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className={classes.button}
                    onClick={e => {
                      if (message) {
                        this.handleClick(e, addMessage, to, from, message);
                      }
                    }}
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
      </Mutation>
    );
  }
}
export default withStyles(styles)(AddMessage);
