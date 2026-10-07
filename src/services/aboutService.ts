import api from "./api";
import type { About } from "../types/about";

export const getAbout = async (): Promise<About> => {
    const response = await api.get("/about");
    return response.data;
};