import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    textAlign: "center",
    margin: "220px"
  },
  style: {
    textDecoration: "none",
    color: "white"
  }
});

function userChat(props) {
  const { classes } = props;
  return (
    <div className={classes.input}>
      <Button variant="contained" color="primary" className={classes.button}>
        <Link to="/Start" className={classes.style}>
          Start
        </Link>
      </Button>
    </div>
  );
}

userChat.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(userChat);
