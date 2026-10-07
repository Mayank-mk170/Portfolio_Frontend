import axios from "axios";

const api = axios.create({
baseURL: "https://portfolio-production-1af8.up.railway.app/api"
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
