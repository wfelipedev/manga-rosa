import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../app/service/auth";
import PersonService from "../app/service/personService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AuthContext = createContext({});
const service = new AuthService();
const servicePerson = new PersonService();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(
    !!JSON.parse(localStorage.getItem("@mangarosa:logged"))
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("@mangarosa:user"))
  );
  const [person, setPerson] = useState(
    JSON.parse(localStorage.getItem("@mangarosa:person"))
  );
  const history = useHistory();

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

  useEffect(() => {
    const storagedToken = localStorage.getItem("@mangarosa:token");
    const storagedUser = localStorage.getItem("@mangarosa:user");
    const storagedPerson = localStorage.getItem("@mangarosa:person");
    const storagedLogged = localStorage.getItem("@mangarosa:logged");

    if (storagedToken && storagedLogged && storagedUser && storagedPerson) {
      setLogged(true);
      setUser(JSON.parse(storagedUser));
      setPerson(JSON.parse(storagedPerson));
    }
  }, []);

  const signin = async (username, password) => {
    try {
      const response = await service.signin({
        username,
        password,
      });

      if (response.data === null) {
        alert("erro ao fazer Sign in");
        return;
      }

      const user = await service.user(response.data.accessToken);

      const person = await servicePerson.getPersonByUser(
        user.data.id,
        response.data.accessToken
      );

      setUser(user.data);
      setPerson(person.data);
      setLogged(true);

      localStorage.setItem("@mangarosa:logged", true);
      localStorage.setItem("@mangarosa:user", JSON.stringify(user.data));
      localStorage.setItem("@mangarosa:person", JSON.stringify(person.data));
      localStorage.setItem("@mangarosa:token", response.data.accessToken);
      if (user.data.role === "employee" && person.data !== "") {
        history.push("/inicio");
      } else if (person.data === "") {
        history.push("/registrar");
      } else if (user.data.role === "admin") {
        history.push("/home");
      }
    } catch (error) {
      warning("E-mail e/ou Senha inválidos!");
    }
  };

  const signout = () => {
    localStorage.clear();
    setLogged(false);
    history.push("/");
  };

  return (
    <>
      <ToastContainer />
      <AuthContext.Provider value={{ logged, user, person, signin, signout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
