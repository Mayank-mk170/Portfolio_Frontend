import api from "./api";
import type { Testimonial } from "../types/testimonial";

export const getTestimonials = async (): Promise<Testimonial[]> => {
    const response = await api.get("/testimonials");
    return response.data;
};