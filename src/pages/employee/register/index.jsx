import React, { useState } from "react";
import { Grid, TextField, makeStyles } from "@material-ui/core";

export default function Register() {
  const classes = useStyles();
  const [person, setPerson] = useState({
    name: "",
    email: "",
    cpf: "",
    phone_number: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <div className={classes.subContainer}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <TextField
              id="outlined-basicUsername"
              variant="outlined"
              label="Nome*"
              name="name"
              autoComplete="off"
              onChange={handleChange}
              fullWidth
              style={{
                margin: ".25rem 0",
                width: "100%",
              }}
            />
            <TextField
              id="outlined-basicUsername"
              variant="outlined"
              label="Email*"
              name="email"
              autoComplete="off"
              onChange={handleChange}
              fullWidth
              style={{
                margin: ".25rem 0",
                width: "100%",
              }}
            />
            <TextField
              id="outlined-basicUsername"
              variant="outlined"
              label="CPF*"
              name="cpf"
              autoComplete="off"
              onChange={handleChange}
              fullWidth
              style={{
                margin: ".25rem 0",
                width: "100%",
              }}
            />
            <TextField
              id="outlined-basicUsername"
              variant="outlined"
              label="Username"
              name="username"
              autoComplete="off"
              onChange={handleChange}
              fullWidth
              style={{
                margin: ".25rem 0",
                width: "100%",
              }}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
  },
  mainContainer: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#FFF",
    backgroundImage: "linear-gradient(45deg,#8016c1, #c11f94)",
    position: "relative",
  },
  subContainer: {
    height: "40rem",
    width: "32rem",
    background: "#FFF",
    padding: "3rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  moreInfo: {
    cursor: "pointer",
    fontSize: ".7rem",
    color: "grey",
    "&:hover": { color: "#333" },
  },
}));
