import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default class Api {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  post(url, object) {
    const request = `${this.apiUrl}${url}`;
    console.log("request", request);
    return api.post(request, object);
  }

  getUser(url, token) {
    const request = `${this.apiUrl}${url}`;
    return api.post(request, {}, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  }

  persist(url, object, token) {
    const request = `${this.apiUrl}${url}`;
    return api.post(request, object, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  }

  get(url, token) {
    const request = `${this.apiUrl}${url}`;
    return api.get(request, {
      headers: {
        Authorization: `bearer ${token.replace(/['"]+/g, "")}`,
      },
    });
  }

  put(url, object, token) {
    const request = `${this.apiUrl}${url}`;
    return api.patch(request, object, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  }

  delete(url, token) {
    const request = `${this.apiUrl}${url}`;
    return api.delete(request, {
      headers: {
        Authorization: `bearer ${token.replace(/['"]+/g, "")}`,
      },
    });
  }
}
