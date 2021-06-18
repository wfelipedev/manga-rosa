import React from "react";
import { Avatar, Grid, Container, makeStyles } from "@material-ui/core";
import DrawerCustom from "../../../components/operator/drawerOperator";
import RegistersData from "../../../components/operator/registers";
import { Plus } from "react-feather";
import ModalUser from "../../../components/operator/modalUser";

export default function Registers() {
  const classes = useStyles();

  return (
    <DrawerCustom>
      <Container className={classes.mainContainer}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1 className={classes.title}>Registros</h1>
          </div>
          <ModalUser />
        </Grid>
        <RegistersData />
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
}));
