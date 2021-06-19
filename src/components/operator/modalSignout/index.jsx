import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Button,
  Grid,
  DialogTitle,
} from "@material-ui/core";
import { LogOut,  X } from "react-feather";
import clsx from "clsx";
import { useAuth } from "../../../contexts/auth";

export default function ModalSignout() {
  const classes = useStyles();
  const { signout } = useAuth();
  const [open, setOpen] = useState(false);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState("xs");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <LogOut className={classes.signout} />
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
            <div/>
            <div className={classes.close} onClick={handleClose}>
              <X size={16} />
            </div>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div style={{position: 'relative', height: '4rem', width: '100%'}}>
            <div className={classes.text}>
              Deseja mesmo encerrar a sessão?
            </div>
          </div>
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
              cancelar
            </Button>
            <Button
              id="next"
              onClick={signout}
              className={clsx(classes.button, classes.buttonConfirmation)}
            >
              sim
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: "#F1F8FF",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.05)",
    },
    "& svg": {
      color: "#2196F3",
    },
  },
  buttonConfirmation: {
    backgroundColor: "#F1F1F1",
    color: "#c11f94",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#f7ebf1",
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
    borderRadius: "0",
  },
  signout: {
    color: "#FF5252",
    "&:hover": {
      cursor: "pointer",
    },
  },
  text:{
    fontWeight: "bold",
    fontSize: '1rem',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }
}));
