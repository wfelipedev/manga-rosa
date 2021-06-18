import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import PersonService from "../../../app/service/personService";
import ModalPerson from "../modalPerson";

export default function RegistersData() {
  const classes = useStyles();
  const service = new PersonService();
  const [people, setPeople] = useState([]);

  const handlePeople = () => {
    var token = localStorage.getItem("@mangarosa:token");
    service.getAll(token).then((response) => {
      setPeople(response.data);
    });
  };

  useEffect(() => {
    handlePeople();
  }, []);

  return (
    <div>
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
            <Grid container direction="row" justify="center" item xs={3}>
              <Typography className={classes.title}>CPF</Typography>
            </Grid>
            <Grid container direction="row" justify="center" item xs={3}>
              <Typography className={classes.title}>Validar</Typography>
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
                <Typography style={{ fontWeight: "bold" }}>
                  {person.name}
                </Typography>
              </Grid>
              <Grid container direction="row" justify="center" item xs={3}>
                <Typography style={{ fontWeight: "bold" }}>
                  {person.email}
                </Typography>
              </Grid>
              <Grid container direction="row" justify="center" item xs={3}>
                <Typography style={{ fontWeight: "bold" }}>
                  {person.cpf}
                </Typography>
              </Grid>
              <Grid container direction="row" justify="center" item xs={3}>
                <ModalPerson person={person} handlePeople={handlePeople} />
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
});
