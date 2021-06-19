import React from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import ModalPerson from "../modalPerson";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import clsx from "clsx";
import moment from "moment";

export default function RegistersData({ people, handlePeople }) {
  const classes = useStyles();

  const success = (error) =>
    toast.success(error, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

  const error = (error) =>
    toast.error(error, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

  return (
    <div>
      <ToastContainer />
      <div>
        <Paper square elevation={0} className={classes.containerTitle}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{ height: "4rem", width: "100%", marginTop: "2rem" }}
          >
            <Grid container direction="row" justify="center" item xs={3}>
              <Typography className={classes.title}>Nome</Typography>
            </Grid>
            <Grid container direction="row" justify="center" item xs={3}>
              <Typography className={classes.title}>Email</Typography>
            </Grid>
            <Grid container direction="row" justify="center" item xs={2}>
              <Typography className={classes.title}>CPF</Typography>
            </Grid>
            <Grid container direction="row" justify="center" item xs={2}>
              <Typography className={classes.title}>Situação</Typography>
            </Grid>
            <Grid container direction="row" justify="center" item xs={2}>
              <Typography className={classes.title}>Validar/Data</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
      {people.map((person) => {
        return (
          <Paper
            key={person.id}
            square
            elevation={0}
            style={{
              height: "4rem",
              width: "100%",
              marginBottom: ".5rem",
              background: "#fff",
            }}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ height: "4rem", width: "100%" }}
            >
              <Grid container direction="row" justify="center" item xs={3}>
                <Typography className={classes.text}>{person.name}</Typography>
              </Grid>
              <Grid container direction="row" justify="center" item xs={3}>
                <Typography className={classes.text}>{person.email}</Typography>
              </Grid>
              <Grid container direction="row" justify="center" item xs={2}>
                <Typography className={classes.text}>{person.cpf}</Typography>
              </Grid>
              <Grid container direction="row" justify="center" item xs={2}>
                <Typography
                  className={clsx(
                    classes.text,
                    person.status === 0
                      ? classes.waiting
                      : person.status === 1
                      ? classes.validated
                      : classes.notvalidated
                  )}
                >
                  {person.status === 0
                    ? "Esperando validação"
                    : person.status === 1
                    ? "Validado"
                    : "Não Validado"}
                </Typography>
              </Grid>
              <Grid container direction="row" justify="center" item xs={2}>
                {person.status === 0 ? (
                  <ModalPerson
                    person={person}
                    handlePeople={handlePeople}
                    success={success}
                    error={error}
                  />
                ) : (
                  <Typography className={clsx(classes.text, classes.date)}>
                    {moment(person.validated_at, "YYYY-MM-DDTHH:mm:ssZ").format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    color: "#9E9E9E",
  },
  containerTitle: {
    height: "3rem",
    width: "100%",
    marginBottom: "1rem",
    background: "#f1f1f1",
  },
  text: {
    fontWeight: "bold",
  },
  validated: {
    color: "#69F0AE",
  },
  notvalidated: {
    color: "#FF5252",
  },
  waiting: {
    color: "#FF6E40",
  },
  date: {
    color: "#9E9E9E",
  },
});
