import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  div: {
    textAlign: "center",
    margin: "20px"
  },
  root: {
    width: "100%",
    maxWidth: 500
  }
});
function NoMatch(props) {
  const { classes } = props;
  return (
    <div className={classes.div}>
      <Typography component="h2" variant="h2" gutterBottom>
        Not Found
      </Typography>
      <Typography variant="h5" gutterBottom>
        Seems like for the page you are looking after does not exist
      </Typography>
    </div>
  );
}
NoMatch.propTypes = {
  classes: PropTypes.shape().isRequired
};
export default withStyles(styles)(NoMatch);
