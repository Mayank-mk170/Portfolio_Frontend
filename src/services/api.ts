import axios from "axios";

const api = axios.create({
baseURL: "https://portfoliobackend-production-1c0b.up.railway.app/api"
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
