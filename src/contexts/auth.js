import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import api from "../app/api";
import AuthService from "../app/service/auth";

const AuthContext = createContext({});
const service = new AuthService();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(
    !!JSON.parse(localStorage.getItem("@mangarosa:logged"))
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("@mangarosa:user"))
  );
  const history = useHistory();

  useEffect(() => {
    const storagedToken = localStorage.getItem("@mangarosa:token");
    const storagedUser = localStorage.getItem("@mangarosa:user");
    const storagedLogged = localStorage.getItem("@mangarosa:logged");

    if (storagedToken && storagedLogged && storagedUser) {
      setLogged(true);
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  const signin = async (username, password) => {
    try {
      const response = await service.signin({
        username,
        password,
      });

      const user = await service.user(response.data.accessToken);

      setUser(user.data);

      if (response.data === null) {
        alert("erro ao fazer Sign in");
        return;
      }

      setLogged(true);

      localStorage.setItem("@mangarosa:logged", true);
      localStorage.setItem("@mangarosa:user", JSON.stringify(user.data));
      localStorage.setItem("@mangarosa:token", response.data.accessToken);
      if (user.data.role === "employee") {
        history.push("/inicio");
      } else if (user.data.role === "admin") {
        history.push("/registros");
      }
      // history.push("/inicio");
    } catch (error) {
      console.log(error);
    }
  };

  const signout = () => {
    localStorage.clear();
    setLogged(false);
    history.push("/");
  };

  return (
    <>
      <AuthContext.Provider value={{ logged, user, signin, signout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
