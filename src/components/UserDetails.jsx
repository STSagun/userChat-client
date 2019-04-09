import React from "react";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { AppBar, Avatar, Toolbar, Fab } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { KeyboardBackspace } from "@material-ui/icons";
import AddMessage from "./AddMessage";
import GetMessages from "./GetMessages";

const styles = theme => ({
  root: {
    width: "90%",
    height: "100vh",
    margin: theme.spacing.unit * 5,
    overflowX: "auto"
  },
  nav: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  textField: {
    width: "90%"
  },
  card: {
    minWidth: 275,
    margin: theme.spacing.unit,
    maxHeight: "80%"
  },
  title: {
    fontSize: 14
  },
  avatar: {
    margin: 10
  },
  back: {
    textAlign: "right"
  },
  fromChat: {
    textAlign: "right"
  }
});

const ADD_MESSAGE = gql`
  subscription messageAdded {
    messageAdded {
      to
      from
      message
    }
  }
`;

class UserDetails extends React.Component {
  state = {};

  render() {
    const { match, classes } = this.props;
    const { to, from } = match.params;

    return (
      <>
        <div className={classes.nav}>
          <AppBar position="static">
            <Toolbar>
              <Avatar className={classes.avatar}>{to[0]}</Avatar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                {to}
              </Typography>
              <Link to={`/Start/UserInfo`}>
                <Fab size="small" color="secondary" aria-label="Add">
                  <KeyboardBackspace />
                </Fab>
              </Link>
            </Toolbar>
          </AppBar>
        </div>
        <Card className={classes.card}>
          <CardContent>
            <GetMessages to={to} from={from} />
          </CardContent>
          <AddMessage to={to} from={from} />
        </Card>
      </>
    );
  }
}

UserDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserDetails);
