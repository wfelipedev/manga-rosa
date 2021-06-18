import React from "react";
import { Grid, Container, makeStyles } from "@material-ui/core";
import { useAuth } from "../../../contexts/auth";
import ProfileEmployee from "../../../components/employee/profileEmployee";
import DrawerEmployee from "../../../components/employee/drawerEmployee";

export default function HomeEmployee() {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <DrawerEmployee>
      <Container className={classes.mainContainer}>
        <Grid container direction="row" justify="center">
          <Grid item xs={4}>
            <ProfileEmployee />
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
            <div
              style={{ height: "62vh", width: "48vw", background: "#f7ebf1" }}
            ></div>
          </Grid>
        </Grid>
      </Container>
    </DrawerEmployee>
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
