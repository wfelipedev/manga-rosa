import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  Chip,
  Typography,
  Tooltip,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import clsx from "clsx";
import InputMask from "react-input-mask";
import AuthService from "../../../app/service/auth";
import PersonService from "../../../app/service/personService";
import KnowledgeService from "../../../app/service/knowledgeService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Eye, EyeOff, Info } from "react-feather";
import { useHistory } from "react-router-dom";

export default function OperatorRegister() {
  const classes = useStyles();
  const history = useHistory();
  const authService = new AuthService();
  const personService = new PersonService();
  const knowledgeService = new KnowledgeService();
  const [showPassword, setShowPassword] = useState(false);
  const [knowledges, setKnowledges] = useState([
    "Git",
    "React",
    "PHP",
    "NodeJS",
    "DevOps",
    "Banco de Dados",
    "TypeScript",
  ]);
  const [myKnowledges, setMyKnowledges] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const [user, setUser] = useState({ username: "", password: "" });
  const [person, setPerson] = useState({
    name: "",
    email: "",
    cpf: "",
    phone_number: "",
  });

  const success = (text) =>
    toast.success(text, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

  const warning = (error) =>
    toast.error(error, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const handleChangeUser = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleKnowledges = (knowledge) => {
    let know = myKnowledges;
    setMyKnowledges([...know, knowledge]);
    handleDeleteKnowledge(knowledge);
    if (know.length === 2) {
      setEnabled(false);
    }
  };

  const handleDelete = (title) => {
    let know = myKnowledges.filter((label) => label !== title);
    setMyKnowledges(know);

    setKnowledges([...knowledges, title]);

    if (know.length < 3) {
      setEnabled(true);
    }
  };

  const handleDeleteKnowledge = (title) => {
    let know = knowledges.filter((label) => label !== title);
    setKnowledges(know);
    if (know.length < 3) {
      setEnabled(true);
    }
  };

  // Metodo exclusivo para criar conta admin e validada para teste
  const handleSubmit = () => {
    if (
      user.username === "" ||
      user.password === "" ||
      person.name === "" ||
      person.email === "" ||
      person.cpf === "" ||
      myKnowledges.length === 0
    ) {
      warning("Preencha todos os campos obrigatórios!");
    } else {
      authService.signup(user).then(() => {
        authService.signin(user).then((response1) => {
          authService.update(response1.data.accessToken)
          personService
            .save(person, response1.data.accessToken)
            .then((response2) => {
              personService.validate(1,response2.data.user_id, response1.data.accessToken).then(response=>{
                myKnowledges.map(
                  async (knowledge) =>
                    await knowledgeService.save(
                      { title: knowledge },
                      response1.data.accessToken
                    )
                );
                success(
                  "Todo pronto! Agora você pode entrar normalmente na sua conta."
                );
                history.push('/')
              })
            })
            .catch((error) => {
              warning("Erro ao cadastrar sua conta.");
            });
        });
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <div className={classes.subContainer}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Typography
              className={classes.title}
              style={{
                marginRight: "1rem",
              }}
            >
              Cadastro de Usuário para teste
            </Typography>
            <Tooltip
              className={classes.tooltip}
              title="Página exclusiva para criação de conta teste. (ADMIN)"
            >
              <Info size={16} />
            </Tooltip>
          </Grid>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            style={{ height: "100%" }}
          >
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <TextField
                id="outlined-basicUsername"
                required
                variant="outlined"
                label="Username"
                name="username"
                autoComplete="off"
                onChange={handleChangeUser}
                fullWidth
                style={{
                  margin: ".25rem 0",
                  width: "100%",
                }}
                error={person.name === "" || person.name === null}
                helperText={
                  person.name === "" ? "Este campo é obrigatório!" : null
                }
              />
              <TextField
                id="outlined-basicPassword"
                type={showPassword ? "text" : "password"}
                required
                variant="outlined"
                label="Password"
                name="password"
                autoComplete="off"
                onChange={handleChangeUser}
                fullWidth
                style={{
                  margin: ".25rem 0",
                  width: "100%",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff style={{ color: "#c11f94" }} />
                        ) : (
                          <Eye style={{ color: "#c11f94" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={person.name === "" || person.name === null}
                helperText={
                  person.name === "" ? "Este campo é obrigatório! A senha deve conter no mínimo 8 caractéres entre letras e números" : null
                }
              />
              <TextField
                id="outlined-basicName"
                required
                variant="outlined"
                label="Nome"
                name="name"
                autoComplete="off"
                onChange={handleChange}
                fullWidth
                style={{
                  margin: ".25rem 0",
                  width: "100%",
                }}
                error={person.name === "" || person.name === null}
                helperText={
                  person.name === "" ? "Este campo é obrigatório!" : null
                }
              />
              <TextField
                id="outlined-basicEmail"
                required
                variant="outlined"
                label="Email"
                name="email"
                autoComplete="off"
                onChange={handleChange}
                fullWidth
                style={{
                  margin: ".25rem 0",
                  width: "100%",
                }}
                error={person.email === "" || person.email === null}
                helperText={
                  person.email === "" ? "Este campo é obrigatório!" : null
                }
              />
              <InputMask
                mask="999.999.999-99"
                value={person.cpf}
                disabled={false}
                onChange={handleChange}
                maskChar=" "
              >
                {() => {
                  return (
                    <TextField
                      id="outlined-basicCPF"
                      required
                      variant="outlined"
                      label="CPF"
                      name="cpf"
                      fullWidth
                      style={{
                        margin: ".25rem 0",
                        width: "100%",
                      }}
                      error={person.cpf === "" || person.cpf === null}
                      helperText={
                        person.cpf === "" ? "Este campo é obrigatório!" : null
                      }
                    />
                  );
                }}
              </InputMask>
              <InputMask
                mask="(99) 99999-9999"
                value={person.phone_number}
                disabled={false}
                onChange={handleChange}
                maskChar=" "
              >
                {() => {
                  return (
                    <TextField
                      id="outlined-basicPhone"
                      variant="outlined"
                      label="Celular"
                      name="phone_number"
                      fullWidth
                      style={{
                        margin: ".25rem 0",
                        width: "100%",
                      }}
                    />
                  );
                }}
              </InputMask>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                item
                xs={12}
              >
                <Typography className={classes.title}>
                  Seus conhecimentos
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {myKnowledges.map((know) => {
                  return (
                    <Chip
                      key={know}
                      className={classes.chip}
                      label={know}
                      variant="outlined"
                      onDelete={() => handleDelete(know)}
                    />
                  );
                })}
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                item
                xs={12}
              >
                <Typography className={classes.title}>
                  Escolha pelo menos 1 e no máximo 3
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {knowledges.map((know) => {
                  return (
                    <Chip
                      key={know}
                      className={classes.chip}
                      label={know}
                      variant="outlined"
                      onClick={() =>
                        enabled
                          ? handleKnowledges(know)
                          : warning(
                              "Você já escolheu o máximo! Para alterar, clique no x"
                            )
                      }
                    />
                  );
                })}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Button onClick={()=> history.push('/')} className={clsx(classes.button, classes.buttonCancel)}>
                cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                className={clsx(classes.button, classes.buttonDone)}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
  },
  mainContainer: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#FFF",
    backgroundImage: "linear-gradient(45deg,#8016c1, #c11f94)",
    position: "relative",
  },
  subContainer: {
    height: "48rem",
    width: "40rem",
    background: "#FFF",
    padding: "3rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  moreInfo: {
    cursor: "pointer",
    fontSize: ".7rem",
    color: "grey",
    "&:hover": { color: "#333" },
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    background: "#FFF",
    color: "#c11f94",
    "&:hover": {
      cursor: "pointer",
    },
  },
  chip: {
    color: "#c11f94",
    marginRight: ".25rem",
    margin: "1rem 0",
  },
  button: {
    height: "4rem",
    width: "49%",
    fontWeight: "bold",
    borderRadius: "0",
  },
  buttonDone: {
    background: "#c11f94",
    color: "#f7ebf1",
    "&:hover": {
      background: "#c11f94",
      color: "#f7ebf1",
    },
  },
  buttonCancel: {
    backgroundColor: "#FFF",
    color: "#ff5252",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#F1F1F1",
      color: "#ff5252",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  tooltip: {
    "&:hover": { cursor: "pointer" },
  },
}));
