import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Button,
  Typography,
  Grid,
  TextField,
  Avatar,
  DialogTitle,
} from "@material-ui/core";
import { Plus, X } from "react-feather";
import AuthService from "../../../app/service/auth";
import clsx from "clsx";

export default function ModalUser() {
  const classes = useStyles();
  const service = new AuthService();
  const [open, setOpen] = useState(false);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState("xs");

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    service
      .signup(user)
      .then((result) => {
        handleClose();
      })
      .catch((err) => alert(`Error: ${err}`));
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <Avatar variant="square" className={classes.avatar}>
          <Plus />
        </Avatar>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        maxWidth={maxWidth}
        fullWidth={fullWidth}
      >
        <DialogTitle>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="inherit" style={{ fontWeight: "bold" }}>
              Novo Usuário
            </Typography>
            <div className={classes.close} onClick={handleClose}>
              <X size={16} />
            </div>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
            className={classes.gridTextfields}
          >
            <Grid item xs={12}>
              <TextField
                id="outlined-basicUsername"
                variant="outlined"
                placeholder="Username"
                name="username"
                autoComplete="off"
                onChange={handleChange}
                style={{
                  margin: ".25rem 0",
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basicPassword"
                variant="outlined"
                placeholder="Senha"
                name="password"
                autoComplete="off"
                onChange={handleChange}
                style={{
                  margin: ".25rem 0",
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            item
            xs={12}
          >
            <Button
              onClick={handleClose}
              className={clsx(classes.button, classes.buttonCancel)}
            >
              Cancelar
            </Button>
            <Button
              id="next"
              onClick={handleSubmit}
              className={clsx(classes.button, classes.buttonConfirmation)}
            >
              Adicionar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: "#f7ebf1",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.05)",
    },
    "& svg": {
      color: "#c11f94",
    },
  },
  buttonConfirmation: {
    backgroundColor: "#f7ebf1",
    color: "#c11f94",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#D8EBFF",
      color: "#c11f94",
    },
  },
  buttonCancel: {
    backgroundColor: "#FFF",
    color: "#ff5252",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#F1F1F1",
      color: "#ff5252",
    },
  },
  close: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  button: {
    height: "3.5rem",
    width: "49%",
    fontWeight: "bold",
    borderRadius: '0'
  },
}));
