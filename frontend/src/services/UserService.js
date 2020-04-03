import axios from 'axios';
import AuthHeader from './Auth-Header';
import Configuration from "./_Configuration";

class UserService {
    getAllUsers() {
        return axios.get(Configuration.API_URL + Configuration.GET_ALL_USERS, { headers: AuthHeader() });
    }
}

export default new UserService();
