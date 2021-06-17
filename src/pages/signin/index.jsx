import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { Eye, EyeOff } from "react-feather";
import AuthService from "../../app/service/auth";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export default function Signin() {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const service = new AuthService();
  const [userSignin, setUserSignin] = useState({
    username: "",
    password: "",
  });

  const { signin, logged } = useAuth();

  if (logged) {
    history.push("/inicio");
    return null;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.code === "Enter") {
      signin(userSignin.username, userSignin.password);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserSignin({ ...userSignin, [name]: value });
  };

  const handleSignup = () => {
    const { email, username, password } = userSignin;
    console.log(userSignin);
    service
      .signup({ email, username, password })
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      className={clsx(classes.root, classes.divRow)}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div className={classes.emptyContainer}>
        <div className={classes.logo}>
          <div className={classes.divRow}>
            <Typography className={classes.logoText}>Manga Rosa</Typography>
          </div>
        </div>
      </div>
      <div className={classes.signinContainer}>
        <div className={classes.container}>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="stretch"
            style={{ height: "100%", width: "100%" }}
          >
            <div>
              <TextField
                id="outlined-basicUsername"
                variant="outlined"
                placeholder="Username"
                name="username"
                autoComplete="off"
                onChange={handleChange}
                fullWidth
                style={{
                  margin: ".25rem 0",
                  width: "100%",
                }}
              />
              <TextField
                id="outlined-basicPassword"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                placeholder="Senha"
                name="password"
                autoComplete="off"
                onChange={handleChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff style={{ color: "#000" }} />
                        ) : (
                          <Eye style={{ color: "#000" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                style={{
                  margin: ".25rem 0",
                  width: "100%",
                }}
              />
            </div>
            <div>
              <div>
                <Button
                  className={clsx(classes.button, classes.signin)}
                  onClick={() =>
                    signin(userSignin.username, userSignin.password)
                  }
                >
                  Entrar
                </Button>
              </div>
              <Button
                className={clsx(classes.button, classes.signup)}
                onClick={() => handleSignup()}
              >
                "Cadastrar-se"
              </Button>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
  },
  emptyContainer: {
    height: "100vh",
    width: "50vw",
    backgroundColor: "#FFF",
    position: "relative",
  },
  signinContainer: {
    height: "100vh",
    width: "50vw",
    background: "#f1f1f1",
    position: "relative",
  },
  divRow: {
    display: "flex",
    flexDirection: "row",
  },
  logo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  logoText: {
    fontSize: "5rem",
  },
  container: {
    height: "20rem",
    width: "24rem",
    background: "#FFF",
    padding: "2rem 4rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  button: {
    height: "4rem",
    width: "100%",
  },
  signin: {
    color: "#fff",
    background: "#333",
    borderRadius: "0",
    transition: "transform .5s",
    "&:hover": {
      transition: "transform .5s",
      background: "#404040",
    },
  },
  signup: {
    color: "#333",
    background: "#E4E4E4",
    borderRadius: "0",
    transition: "transform .5s",
    "&:hover": {
      transition: "transform .5s",
      background: "#F1F1F1",
    },
  },
});
