import api from "./api";
import type { Blog } from "../types/blog";

export const getBlogs = async (): Promise<Blog[]> => {
    const response = await api.get("/blogs");
    return response.data;
};