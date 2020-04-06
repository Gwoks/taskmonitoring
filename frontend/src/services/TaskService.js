import axios from 'axios';
import AuthHeader from './Auth-Header';
import Configuration from "./_Configuration";

class TaskService {
    getAllTask(data) {
        return axios.post(Configuration.API_URL + Configuration.TASKS + '/all', { userId: data }, { headers: AuthHeader() });
    }

    createTask(data) {
        return axios.post(Configuration.API_URL + Configuration.TASKS, data, { headers: AuthHeader() });
    }

    updateTask(id, data) {
        return axios.put(Configuration.API_URL + Configuration.TASKS + '/' + id, data, { headers: AuthHeader() });
    }

    findOne(id) {
        return axios.post(Configuration.API_URL + Configuration.TASKS + '/' + id, { headers: AuthHeader() });
    }

    remove(id) {
        return axios.delete(Configuration.API_URL + Configuration.TASKS + '/' + id, { headers: AuthHeader() });
    }
}

export default new TaskService();
