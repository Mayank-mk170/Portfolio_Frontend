import api from "./api";
import type { Skill } from "../types/skill";

export const getSkills = async (): Promise<Skill[]> => {
    const response = await api.get("/skills");
    return response.data;
};