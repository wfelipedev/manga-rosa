import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
  Tooltip,
} from "@material-ui/core";
import clsx from "clsx";
import { Eye, EyeOff } from "react-feather";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export default function Signin() {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [userSignin, setUserSignin] = useState({
    username: "",
    password: "",
  });
  const { signin, logged } = useAuth();

  if (logged) {
    history.push("/home");
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
                          <EyeOff style={{ color: "#c11f94" }} />
                        ) : (
                          <Eye style={{ color: "#c11f94" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                style={{
                  margin: ".25rem 0",
                  width: "100%",
                }}
                helperText={"A senha deve conter no mínimo 8 caractéres entre letras e números"}
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
              <Tooltip title="Apenas para cadastro de usuário ADMIN e VALIDADO para teste.">
                <Button
                  className={clsx(classes.button, classes.signup)}
                  onClick={() => history.push("/register")}
                >
                  Cadastrar-se
                </Button>
              </Tooltip>
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
    backgroundImage: "linear-gradient(45deg,#8016c1, #c11f94)",
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
    fontWeight: "bold",
    color: "#FFF",
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
    color: "#FFFFFF",
    background: "#c11f94",
    borderRadius: "0",
    transition: "transform .5s",
    "&:hover": {
      transition: "transform .5s",
      background: "#b31085",
    },
  },
  signup: {
    color: "#333",
    background: "#F1F1F1",
    borderRadius: "0",
    transition: "transform .5s",
    "&:hover": {
      transition: "transform .5s",
      background: "#f7ebf1",
    },
  },
});
