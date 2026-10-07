import api from "./api";
import type { Experience } from "../types/experience";

export const getExperiences = async (): Promise<Experience[]> => {
    const response = await api.get("/experience");
    return response.data;
};