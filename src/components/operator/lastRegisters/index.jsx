import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PersonService from "../../../app/service/personService";
import { useAuth } from "../../../contexts/auth";

export default function LastRegisters() {
  const classes = useStyles();
  const { person } = useAuth();
  const history = useHistory();
  const service = new PersonService();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    var token = localStorage.getItem("@mangarosa:token");
    service.getAll(token).then((response) => {
      setPeople(response.data);
    });
  }, []);

  return (
    <Paper
      elevation={0}
      style={{
        height: "62vh",
        width: "48vw",
        backgroundColor: "#fff",
        borderRadius: "0",
      }}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ padding: "2rem" }}
      >
        <Typography className={classes.title}>Últimos Registros</Typography>
        <div onClick={() => history.push("/registers")}>
          <Typography className={classes.moreInfo} style={{}}>
            ver mais...
          </Typography>
        </div>
      </Grid>
      <div style={{ padding: "0 2rem" }}>
        {people.slice(0, 5).map((p) => {
          return (
            <div key={p.id} className={classes.userTile}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={9} style={{ fontWeight: "bold" }}>
                  {p.name}
                </Grid>
                <Grid item xs={2}>
                  <div style={{ position: "relative" }}>
                    <div
                      className={
                        p.name === person.name
                          ? classes.me
                          : p.status === 0
                          ? classes.waiting
                          : p.status === 1
                          ? classes.validated
                          : classes.notvalidated
                      }
                    >
                      {p.name === person.name
                        ? "Minha conta"
                        : p.status === 0
                        ? "Esperando validação"
                        : p.status === 1
                        ? "Validado"
                        : "Não Validado"}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  userTile: {
    height: "3.5rem",
    width: "100%",
    background: "#f7ebf1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 1.5rem",
    marginTop: ".5rem",
  },
  moreInfo: {
    cursor: "pointer",
    fontSize: ".7rem",
    color: "grey",
    "&:hover": { color: "#333" },
  },
  status: {
    color: "#FF6E40",
    fontSize: ".8rem",
    fontWeight: "bold",
    width: "100%",
  },
  validated: {
    fontWeight: "bold",
    fontSize: ".8rem",
    color: "#69F0AE",
  },
  notvalidated: {
    fontWeight: "bold",
    fontSize: ".8rem",
    color: "#FF5252",
  },
  waiting: {
    fontWeight: "bold",
    fontSize: ".8rem",
    color: "#FF6E40",
  },
  me: {
    fontWeight: "bold",
    fontSize: ".8rem",
    color: "#9E9E9E",
  },
}));
