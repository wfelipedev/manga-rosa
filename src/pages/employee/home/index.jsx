import React from "react";
import { Grid, Container, Typography, makeStyles } from "@material-ui/core";
import { useAuth } from "../../../contexts/auth";
import ProfileEmployee from "../../../components/employee/profileEmployee";
import DrawerEmployee from "../../../components/employee/drawerEmployee";
import LastCheckouts from "../../../components/employee/lastCheckouts";
import moment from "moment";

export default function HomeEmployee() {
  const classes = useStyles();
  const { person } = useAuth();
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
            {person.status === 0 ? (
              <div className={classes.subContainer}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.subContainer}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Esperando sua validação
                  </Typography>
                </Grid>
              </div>
            ) : person.status === 2 ? (
              <div className={classes.subContainer}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className={classes.subContainer}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Sua Conta não foi validada.
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "#9E9E9E",
                    }}
                  >
                    Data em que foi revisado:{" "}
                    {moment(person.validated_at, "YYYY-MM-DDTHH:mm:ssZ").format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </Typography>
                </Grid>
              </div>
            ) : (
              <LastCheckouts />
            )}
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
  subContainer: {
    height: "62vh",
    width: "48vw",
    background: "#f7ebf1",
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
