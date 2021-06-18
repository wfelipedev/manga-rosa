import React from "react";
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import { Home, Users } from "react-feather";

export default function DrawerCustom({ children }) {
  const routeSelected = window.location.toString().split("/").slice(-1)[0];
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={clsx(classes.toolbar, classes.logo)}
          onClick={() => history.push("/home")}
        >
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", cursor: "pointer", color: "#2196F3" }}
          >
            Manga Rosa
          </Typography>
        </div>
        <List>
          <ListItem
            component={Link}
            className={clsx(
              classes.drawerButtons,
              routeSelected === "home" ? classes.drawerSelected : ""
            )}
            to="/home"
          >
            <ListItemIcon>
              <Home style={{ color: "#c11f94" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography style={{ fontWeight: "bold" }}>Início</Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            component={Link}
            className={clsx(
              classes.drawerButtons,
              routeSelected === "registers" ? classes.drawerSelected : ""
            )}
            to="/registers"
          >
            <ListItemIcon>
              <Users style={{ color: "#c11f94" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography style={{ fontWeight: "bold" }}>Registros</Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main style={{ backgroundColor: "#F1F1F1" }}>{children}</main>
    </div>
  );
}

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    padding: "1rem",
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#FFF",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "-webkit-linear-gradient(90deg, #8016c1, #c11f94)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  drawerSelected: {
    borderRightStyle: "solid",
    borderColor: "#c11f94",
    borderWidth: ".3rem",
  },
  drawerButtons: {
    color: "#c11f94",
    "&:hover": {
      backgroundColor: "#f7ebf1",
      color: "#c11f94",
      transition: ".2s",
    },
    margin: "10px 0 0 0",
  },
}));
