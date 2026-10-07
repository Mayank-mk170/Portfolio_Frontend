export interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    image: string;
    author: string;
    tags: string[];
    published: boolean;
    publishedAt: string | null;
    views: number;
    createdAt: string;
    updatedAt: string;
}