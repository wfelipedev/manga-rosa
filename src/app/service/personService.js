import Api from "../api";

export default class PersonService extends Api {
  constructor() {
    super("/person");
  }

  save(person, token) {
    return this.persist("/", person, token);
  }

  getAll(token) {
    return this.get("/", token);
  }

  getAllFilter(token, filter) {
    return this.get(`?search=${filter}`, token);
  }

  getPersonByUser(id, token) {
    return this.getPerson(id, token);
  }

  validate(id, status, token) {
    return this.put(`/${id}/update/${status}`, { status: status }, token);
  }
}
