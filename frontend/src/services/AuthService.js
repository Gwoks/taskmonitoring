import axios from "axios";
import Configuration from "./_Configuration";

class AuthService {
    login(username, password) {
        return axios
            .post(Configuration.API_URL + Configuration.SIGNIN, {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(full_name, username, email, password) {
        return axios.post(Configuration.API_URL + Configuration.SIGNUP_USER, {
            full_name,
            username,
            email,
            password
        });
    }

    registerManager(full_name, username, email, password) {
        return axios.post(process.env.API_URL + Configuration.SIGNUP_MANAGER, {
            full_name,
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
