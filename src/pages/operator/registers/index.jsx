import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  makeStyles,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import DrawerCustom from "../../../components/operator/drawerOperator";
import RegistersData from "../../../components/operator/registers";
import ModalUser from "../../../components/operator/modalUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PersonService from "../../../app/service/personService";
import { DebounceInput } from "react-debounce-input";
import { Search } from "react-feather";

export default function Registers() {
  const classes = useStyles();
  const service = new PersonService();
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");

  const success = (error) =>
    toast.success(error, {
      position: "bottom-center",
      autoClose: 10000,
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

  const handlePeople = () => {
    var token = localStorage.getItem("@mangarosa:token");
    service.getAll(token).then((response) => {
      setPeople(response.data);
    });
  };

  useEffect(() => {
    if (search !== "") handleFilter();
    else handlePeople();
  }, [search]);

  const handleFilter = async () => {
    const token = localStorage.getItem("@mangarosa:token");
    await service
      .getAllFilter(token, search)
      .then((result) => {
        const people = [];
        result.data.map((person) => {
          people.unshift(person);
        });
        setPeople(people);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <ToastContainer />
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
            <div style={{ display: "flex", flexDirection: "row" }}>
              <DebounceInput
                minLength={0}
                debounceTimeout={300}
                element={TextField}
                size="small"
                label="Filtrar"
                fullWidth
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <ModalUser success={success} error={error} />
            </div>
          </Grid>
          <RegistersData people={people} handlePeople={handlePeople} />
        </Container>
      </DrawerCustom>
    </>
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
