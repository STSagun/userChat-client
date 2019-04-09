/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import green from "@material-ui/core/colors/green";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import Person from "@material-ui/icons/Person";
import Dialog from "@material-ui/core/Dialog";
import GetUser from "./GetUser";

const styles = theme => ({
  error: {
    fontSize: "14px",
    color: "red"
  },
  main: {
    width: "auto",

    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: "7px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  textField: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  style: {
    textDecoration: "none",
    color: "white"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: {
        name: "",
        email: ""
      },
      Query: false,
      touched: {
        name: false,
        email: false
      },
      loading: false,
      result: {},
      loader: false
    };
  }

  handlerChange = field => event => {
    const { dataUser, touched } = this.state;
    this.setState({
      dataUser: { ...dataUser, [field]: event.target.value },
      touched: { ...touched, [field]: true }
    });
  };

  hasTouched = () => {
    const { touched } = this.state;
    let touchCheck = 0;
    Object.keys(touched).forEach(element => {
      if (touched[element] === true) touchCheck += 1;
    });
    if (touchCheck === 2) return true;

    return false;
  };
  handlerSubmit = async () => {
    this.setState({
      loading: true,
      Query: true
    });
  };

  isTouched = () => {
    const { touched } = this.state;
    return !!Object.keys(touched).length;
  };
  handle = () => {
    console.log('inhandle')
    this.setState({
      loading: false,
      dataUser: {name: "" ,email: ""},
      loader: true,
    });
  }
  query = e => {
    console.log('inquery')
    
    this.setState({
      Query : false,
      loader: false
    });
  }

  render() {
    const { classes, open, onClose, onSubmit, history } = this.props;
    const { dataUser, loading, Query, loader } = this.state;
    return (
      <>
        <Dialog open={open} onClose={onClose} onSubmit={onSubmit}>
          <main className={classes.main}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={classes.form}>
                <TextField
                  id="outlined-name-input"
                  label="Name"
                  className={classes.textField}
                  onChange={this.handlerChange("name")}
                  type="name"
                  value={dataUser.name}
                  name="name"
                  autoComplete="name"
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  className={classes.textField}
                  onChange={this.handlerChange("email")}
                  type="email"
                  value={dataUser.email}
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    )
                  }}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {this.hasTouched() ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    className={classes.submit}
                    onClick={() => this.handlerSubmit()}
                  >
                    SIGN IN
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    color="primary"
                    disabled
                  >
                    SIGN IN
                  </Button>
                )}
                {loader ? (this.query()) : "" }
                {Query ? <GetUser data={dataUser} history={history} handle={this.handle}  /> : ""}
                
                

              </form>
            </Paper>
          </main>
        </Dialog>
      </>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

export default withStyles(styles)(Login);
