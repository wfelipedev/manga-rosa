import { Route, Switch } from "react-router-dom";
import Signin from "../pages/signin";
// import Home from "../pages/home";
// import Transactions from "../pages/transactions";
import Private from "./private";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Signin} />
      {/*  <Private exact path="/inicio" component={Home} />
      <Private exact path="/transacoes" component={Transactions} /> */}
    </Switch>
  );
}
