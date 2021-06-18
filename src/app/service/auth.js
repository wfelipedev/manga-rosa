import Api from "../api";

export default class AuthService extends Api {
  constructor() {
    super("/auth");
  }

  signin(credentials) {
    return this.post("/signin", credentials);
  }

  signup(credentials) {
    return this.post("/signup", credentials);
  }

  user(token) {
    return this.getUser("/user", token);
  }

  getUsers(token) {
    return this.get("/all", token);
  }
}
