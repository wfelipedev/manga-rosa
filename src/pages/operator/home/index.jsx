import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import DrawerCustom from "../../../components/operator/drawerOperator";
import ProfileOperator from "../../../components/operator/profileOperator";
import LastRegisters from "../../../components/operator/lastRegisters";

export default function HomeOperator() {
  const classes = useStyles();

  return (
    <DrawerCustom>
      <Container className={classes.mainContainer}>
        <Grid container direction="row" justify="center">
          <Grid item xs={4}>
            <ProfileOperator />
          </Grid>
          <Grid container direction="column" justify="center" item xs={8}>
            <div
              style={{
                height: "24vh",
                width: "48vw",
                background: "#f7ebf1",
                marginBottom: "2vh",
              }}
            ></div>
            <div style={{ height: "62vh", width: "48vw" }}>
              <LastRegisters />
            </div>
          </Grid>
        </Grid>
      </Container>
    </DrawerCustom>
  );
}

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "100vh",
    minWidth: `calc(100vw - ${drawerWidth}px)`,
    padding: "4rem",
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  moreInfo: {
    cursor: "pointer",
    fontSize: ".7rem",
    color: "grey",
    "&:hover": { color: "#333" },
  },
}));
