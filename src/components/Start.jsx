import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Login from "./Login";
// import { AddDialog } from './Components';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    textAlign: "center",
    margin: "100px",
    borderStyle: "outset",
    padding: "40px"
  },
  style: {
    textDecoration: "none",
    color: "white"
  }
});

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  Submit = (...values) => {
    this.setState({ open: false });
    console.log(...values);
  };

  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.input}>
        <div>
          <h1>Welcome to Chat App</h1>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickOpen}
          >
            Login
          </Button>
        </div>{" "}
        <h4>or</h4>{" "}
        <Login
          open={open}
          onClose={this.handleClose}
          onSubmit={this.Submit}
          {...this.props}
        />
        <div>
          <Link to="/AddUser" className={classes.style}>
            <Button variant="contained" color="primary">
              Create new User
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Start);
