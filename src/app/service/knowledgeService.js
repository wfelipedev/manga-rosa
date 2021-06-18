import Api from '../api'

export default class KnowledgeService extends Api {
    constructor() {
        super('/knowledge')
    }

    save(transaction, token) {
        return this.persist('/', transaction, token);
    }

    getAll(token) {
        return this.get('/', token)
    }

    getAllFilter(token, filter) {
        return this.get(`?search=${filter}`, token)
    }

    update(id, transaction, token) {
        return this.put(`/${id}/update`, transaction, token)
    }

    deleteTransaction(id, token) {
        return this.delete(`/${id}`, token)
    }

}