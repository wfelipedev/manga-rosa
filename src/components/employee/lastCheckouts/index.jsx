import React from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

export default function LastCheckouts() {
  const classes = useStyles();

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
        <Typography className={classes.title}>Seus últimos pontos</Typography>
        <div>
          <Typography className={classes.moreInfo} style={{}}>
            ver mais...
          </Typography>
        </div>
      </Grid>
      <div style={{ padding: "0 2rem" }}>
        
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
  status: {
    color: "#FF6E40",
    fontSize: ".8rem",
    fontWeight: "bold",
    width: "100%",
  },
  moreInfo: {
    cursor: "pointer",
    fontSize: ".7rem",
    color: "grey",
    "&:hover": { color: "#333" },
  },
}));
