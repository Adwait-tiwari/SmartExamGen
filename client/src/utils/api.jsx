import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-exam-46wori2tc-adwaits-projects-d578e2d0.vercel.app",
  withCredentials: true,
});

export default api;
