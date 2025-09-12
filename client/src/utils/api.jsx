import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL,
    withCredentials: true, // if you are using cookies/sessions
});

export default api;