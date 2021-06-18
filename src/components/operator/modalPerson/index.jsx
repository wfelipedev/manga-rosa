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
  DialogTitle,
} from "@material-ui/core";
import {  X } from "react-feather";
import AuthService from "../../../app/service/auth";
import clsx from "clsx";

export default function ModalPerson({ person, handlePeople }) {
  const classes = useStyles();
  const service = new AuthService();
  const [open, setOpen] = useState(false);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState("xs");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.clear();
    console.log(person);
    /* const { title, value, category, type } = transaction;
    const token = localStorage.getItem("@senfinanca:token");
    service
      .save({ title, value, category, type }, token)
      .then((result) => {
        handlePeople();
        handleClose();
      })
      .catch((err) => alert(`Error: ${err}`)); */
  };

  return (
    <div>
      <div onClick={handleClickOpen} style={{ position: "relative" }}>
        <div className={classes.validate}>Validar</div>
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
              Validação
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
                label="Name"
                name="name"
                value={person.name}
                autoComplete="off"
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
                label="Email"
                name="email"
                value={person.email}
                autoComplete="off"
                style={{
                  margin: ".25rem 0",
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basicPassword"
                variant="outlined"
                label="CPF"
                name="cpf"
                value={person.cpf}
                autoComplete="off"
                style={{
                  margin: ".25rem 0",
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basicPassword"
                variant="outlined"
                label="Celular"
                name="phone_number"
                value={person.phone_number}
                autoComplete="off"
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
              Validar
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
    backgroundColor: "#D1E3E8",
    color: "#5E6669",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#DCEFF5",
      color: "#5E6669",
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
  validate: {
    background: "#f7ebf1",
    color: "#c11f94",
    fontWeight: "bold",
    padding: ".5rem 1rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
