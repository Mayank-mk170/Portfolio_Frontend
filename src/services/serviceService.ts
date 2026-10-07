import api from "./api";
import type { PortfolioService } from "../types/service";

export const getServices = async (): Promise<PortfolioService[]> => {
    const response = await api.get("/services");
    return response.data;
};