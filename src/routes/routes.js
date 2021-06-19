import { Route, Switch } from "react-router-dom";
import HomeOperator from "../pages/operator/home";
import Registers from "../pages/operator/registers";
import Signin from "../pages/signin";
import OperatorRoute from "./operator";
import EmployeeRoute from "./employee";
import HomeEmployee from "../pages/employee/home";
import Register from "../pages/employee/register";
import OperatorRegister from "../pages/operator/register";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/register" component={OperatorRegister} />

      <OperatorRoute exact path="/home" component={HomeOperator} />
      <OperatorRoute exact path="/registers" component={Registers} />

      <EmployeeRoute exact path="/inicio" component={HomeEmployee} />
      <EmployeeRoute exact path="/registrar" component={Register} />
      {/*  <Private exact path="/inicio" component={Home} />
      <Private exact path="/transacoes" component={Transactions} /> */}
    </Switch>
  );
}
