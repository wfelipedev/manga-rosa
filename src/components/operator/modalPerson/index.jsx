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
  Chip,
} from "@material-ui/core";
import { X } from "react-feather";
import PersonService from "../../../app/service/personService";
import AuthService from "../../../app/service/auth";
import clsx from "clsx";
import { useEffect } from "react";

export default function ModalPerson({ person, handlePeople, success, error }) {
  const classes = useStyles();
  const authService = new AuthService();
  const personService = new PersonService();
  const [open, setOpen] = useState(false);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState("xs");
  const [knowledges, setKnowledges] = useState([]);

  const handleGetUser = async () => {
    const token = localStorage.getItem("@mangarosa:token");
    await authService.getUserId(person.user_id, token).then((response) => {
      setKnowledges(response.data.knowledges);
    });
  };

  useEffect(() => {
    if (open) handleGetUser();
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
    handleGetUser();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDontValidate = () => {
    const token = localStorage.getItem("@mangarosa:token");
    personService
      .validate(person.user_id, 2, token)
      .then((result) => {
        handlePeople();
        handleClose();
        success("Não validado com sucesso!");
      })
      .catch((err) => error("Erro ao não validar!"));
  };

  const handleValidate = () => {
    const token = localStorage.getItem("@mangarosa:token");
    personService
      .validate(person.user_id, 1, token)
      .then((result) => {
        handlePeople();
        handleClose();
        success("Validado com sucesso!");
      })
      .catch((err) => error("Erro ao validar!"));
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
                disabled
                variant="outlined"
                label="Nome"
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
                disabled
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
                id="outlined-basicCpf"
                disabled
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
                id="outlined-basicPhone"
                disabled
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
            <Grid item xs={12}>
              <Typography className={classes.title}>Conhecimentos:</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              item
              xs={12}
            >
              {knowledges !== []
                ? knowledges.map((knowledge) => {
                    return (
                      <Chip
                        key={knowledge.title}
                        className={classes.chip}
                        label={knowledge.title}
                        variant="outlined"
                      />
                    );
                  })
                : "Nunhum conhecimento"}
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
              onClick={handleDontValidate}
              className={clsx(classes.button, classes.buttonCancel)}
            >
              Não Validar
            </Button>
            <Button
              id="next"
              onClick={handleValidate}
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
    borderRadius: "0",
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
  chip: {
    color: "#c11f94",
    marginRight: ".25rem",
    marginTop: ".5rem",
  },
  title: {
    fontWeight: "bold",
  },
}));
