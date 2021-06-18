import Api from '../api'

export default class PersonService extends Api {
    constructor() {
        super('/person')
    }

    save(transaction, token) {
        return this.persist('/', transaction, token);
    }

    getAll(token) {
        return this.get('/', token)
    }

    getPersonByUser(id, token) {
        return this.getPerson(id, token)
    }


}