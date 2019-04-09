import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    textDecoration: "none",
    color: "white"
  },
  input: {
    display: "none"
  },
  style: {
    margin: "6px",
    width: "25%"
  },
  center: {
    textAlign: "center"
  }
});

const GET_USER = gql`
  query getAllUser {
    getAllUser {
      id
      name
    }
  }
`;
const USER_ADDED = gql`
  subscription {
    userAdded {
      id
      name
    }
  }
`;

class UserLists extends React.Component {
  state = {};
  subscribeToNewUser = subscribeToMore => {
    subscribeToMore({
      document: USER_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData.data.userAdded) {
          const newResult = subscriptionData.data.userAdded;
          return Object.assign({}, prev, {
            getAllUser: [...prev.getAllUser, newResult]
          });
        } else {
          return prev;
        }
      }
    });
  };

  render() {
    const { classes, history, match } = this.props;
    const { location } = history;
    const { from, to } = match.params;

    return (
      <Query query={GET_USER} fetchPolicy="network-only">
        {({ data, loading, error, subscribeToMore }) => {
          if (loading) return <div>{JSON.stringify(loading)}</div>;
          if (error) return <div>{JSON.stringify(error)}</div>;
          if (data.getAllUser) {
            var rows = data.getAllUser;
            if (rows.length === 0) {
              return <h1>No Data Found</h1>;
            }
            this.subscribeToNewUser(subscribeToMore);
            return (
              <div className={classes.center}>
                <h1>Friend List</h1>
                {rows.map(ch => (
                  <div className={classes.center}>
                    <Link
                      className={classes.button}
                      to={`${location.pathname}/${ch.name}`}
                    >
                      {!(from === ch.name) ? (
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.style}
                        >
                          {ch.name}
                        </Button>
                      ) : (
                        ""
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            );
          }

          return <h1>No Data Found</h1>;
        }}
      </Query>
    );
  }
}

UserLists.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserLists);
