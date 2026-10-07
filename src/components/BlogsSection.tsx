import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import type { Blog } from "../types/blog";

function BlogsSection() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const data = await getBlogs();

                const publishedBlogs = data
                    .filter((blog) => blog.published)
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    );

                setBlogs(publishedBlogs);
            } catch (err) {
                console.error("Failed to load blogs:", err);
                setError("Unable to load Blogs section.");
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, []);

    if (loading) {
        return (
            <section
                className="blogs-section"
                id="blogs"
            >
                <div className="blogs-loading">
                    Loading Blogs...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section
                className="blogs-section"
                id="blogs"
            >
                <div className="blogs-error">
                    {error}
                </div>
            </section>
        );
    }

    return (
        <section
            className="blogs-section"
            id="blogs"
        >
            {/* Section Header */}

            <div className="blogs-header">
                <div className="blogs-label">
                    <span>07</span>
                    <span>BLOGS</span>
                </div>

                <div className="blogs-line"></div>
            </div>

            {/* Content */}

            <div className="blogs-content">

                <div className="blogs-intro">
                    <h2 className="blogs-title">
                        Latest Thoughts
                    </h2>

                    <p className="blogs-description">
                        Articles, ideas and technical insights
                        about development and technology.
                    </p>
                </div>

                {blogs.length === 0 ? (
                    <div className="blogs-empty">
                        No published blogs available.
                    </div>
                ) : (
                    <div className="blogs-list">

                        {blogs.map((blog) => (
                            <article
                                key={blog.id}
                                className="blog-item"
                            >
                                {/* Image */}

                                {blog.image && (
                                    <div className="blog-image-wrapper">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="blog-image"
                                        />
                                    </div>
                                )}

                                {/* Blog Content */}

                                <div className="blog-main">

                                    <div className="blog-meta">
                                        <span>
                                            {blog.author || "Admin"}
                                        </span>

                                        <span>
                                            /
                                        </span>

                                        <span>
                                            {new Date(
                                                blog.createdAt
                                            ).toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                }
                                            )}
                                        </span>
                                    </div>

                                    <h3 className="blog-title">
                                        {blog.title}
                                    </h3>

                                    {blog.excerpt && (
                                        <p className="blog-excerpt">
                                            {blog.excerpt}
                                        </p>
                                    )}

                                    {/* Tags */}

                                    {blog.tags &&
                                        blog.tags.length > 0 && (
                                            <div className="blog-tags">
                                                {blog.tags.map(
                                                    (tag) => (
                                                        <span
                                                            key={tag}
                                                            className="blog-tag"
                                                        >
                                                            {tag}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        )}

                                    {/* Read Link */}

                                    <a
                                        href={`/blogs/${blog.slug}`}
                                        className="blog-link"
                                    >
                                        <span>
                                            Read Article
                                        </span>

                                        <span>
                                            ↗
                                        </span>
                                    </a>

                                </div>
                            </article>
                        ))}

                    </div>
                )}

            </div>
        </section>
    );
}

export default BlogsSection;