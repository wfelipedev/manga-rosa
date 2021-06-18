import React, { useState, useEffect } from "react";
import { Grid, Avatar, Chip, makeStyles, Typography } from "@material-ui/core";
import { useAuth } from "../../../contexts/auth";
import KnowledgeService from "../../../app/service/knowledgeService";
import { Edit2, LogOut } from "react-feather";
import ModalSignout from "../modalSignout";

export default function ProfileOperator() {
  const classes = useStyles();
  const { user, person, signout } = useAuth();
  const [knowledges, setKnowledges] = useState([]);
  const service = new KnowledgeService();

  useEffect(() => {
    var token = localStorage.getItem("@mangarosa:token");
    service.getAll(token).then((response) => {
      setKnowledges(response.data);
    });
  }, []);

  return (
    <div
      style={{
        height: "88vh",
        width: "24vw",
        background: "#FFF",
        padding: "2rem 2rem",
      }}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Typography className={classes.title}>
          Seu Perfil - {user.role === "admin" ? "Administrador" : ""}
        </Typography>
        <ModalSignout />
      </Grid>

      <div
        style={{
          height: "70%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar className={classes.avatar}>{person.name[0]}</Avatar>
        <Typography className={classes.name}>{person.name}</Typography>
        <Typography className={classes.email}>{person.email}</Typography>
        <div style={{ position: "relative" }}>
          <div className={classes.edit}>
            <Edit2 size={16} style={{ marginRight: ".5rem" }} />
            Editar
          </div>
        </div>
      </div>
      <div style={{ height: "30%" }}>
        <Typography variant="h5">Conhecimentos</Typography>
        {knowledges.map((knowledge) => {
          return (
            <Chip
              className={classes.chip}
              label={knowledge.title}
              variant="outlined"
            />
          );
        })}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(24),
    height: theme.spacing(24),
    marginBottom: "1rem",
    background: "#f7ebf1",
    color: "#c11f94",
    fontSize: "3rem",
  },
  name: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  email: {
    fontSize: ".8rem",
    color: "grey",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  chip: {
    color: "#c11f94",
    marginRight: ".25rem",
    marginTop: "1rem",
  },
  edit: {
    background: "#f7ebf1",
    color: "#c11f94",
    padding: ".5rem 1rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "row",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
