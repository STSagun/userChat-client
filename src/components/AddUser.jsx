import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      name
      email
      id
    }
  }
`;
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  buttons: {
    padding: "15px"
  },
  style: {
    textDecoration: "none",
    color: "white", 
  },
  div: {
    textAlign: "center",
    margin: "10%",
  },
  form: {
    borderStyle: "outset",
    padding: "40px",
    margin: "10%",
  },
  login: {
    padding: "10px"
  }
});

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }
  handleNameChange = event => {
    event.preventDefault();
    this.setState({
      name: event.target.value
    });
  };

  handleEmailChange = event => {
    event.preventDefault();
    this.setState({
      email: event.target.value
    });
  };

  handle = () => {
    console.log("in handle");
    this.setState({
      name: "",
      email: ""
    });
  };

  render() {
    const { classes } = this.props;
    const { name, email } = this.state;
    console.log("[render", this.state);
    return (
      <div className={classes.div}>
        <Mutation mutation={ADD_USER}>
          {(addUser, { data }) => (
            <form
              Class
              onSubmit={event => {
                console.log("name>>>>>>>.", name, "email>>>>>>>>>", email);
                event.preventDefault();
                if (name === "" || email === "") {
                  alert("enter the values!!!!!!!!");
                  return;
                }
                if (addUser({ variables: { name: name, email: email } })) {
                  this.handle();
                }
              }}
            >
            <div className={classes.form}>
            <h1>Register</h1>
              <div>
                <TextField
                  label="Name"
                  name="name"
                  value={name}
                  onChange={this.handleNameChange}
                />
              </div>
              <div>
                <TextField
                  name="email"
                  label="Email"
                  value={email}
                  onChange={this.handleEmailChange}
                />
              </div>
              <div className={classes.buttons}>
              <div>
                <Button variant="contained" color="primary" type="submit" >
                  Add
                </Button>
              </div>
              <div className={classes.login}>
                <Link to="/Start" className={classes.style}>
                  <Button variant="contained" >Login</Button>
                </Link>
              </div>
              </div>
              </div>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}
export default withStyles(styles)(AddUser);
