import { useEffect, useState } from "react";
import { getTestimonials } from "../services/testimonialService";
import type { Testimonial } from "../types/testimonial";

function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTestimonials = async () => {
            try {
                const data = await getTestimonials();

                const sortedTestimonials = [...data].sort(
                    (a, b) => a.order - b.order
                );

                setTestimonials(sortedTestimonials);
            } catch (err) {
                console.error(
                    "Failed to load testimonials:",
                    err
                );

                setError(
                    "Unable to load Testimonials section."
                );
            } finally {
                setLoading(false);
            }
        };

        loadTestimonials();
    }, []);

    if (loading) {
        return (
            <section
                className="testimonials-section"
                id="testimonials"
            >
                <div className="testimonials-loading">
                    Loading Testimonials...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section
                className="testimonials-section"
                id="testimonials"
            >
                <div className="testimonials-error">
                    {error}
                </div>
            </section>
        );
    }

    return (
        <section
            className="testimonials-section"
            id="testimonials"
        >

            {/* Section Header */}

            <div className="testimonials-header">

                <div className="testimonials-label">
                    <span>06</span>
                    <span>TESTIMONIALS</span>
                </div>

                <div className="testimonials-line"></div>

            </div>


            {/* Section Content */}

            <div className="testimonials-content">

                <div className="testimonials-intro">

                    <h2 className="testimonials-title">
                        What People Say
                    </h2>

                    <p className="testimonials-description">
                        Feedback from people I have worked
                        with and collaborated with.
                    </p>

                </div>


                {testimonials.length === 0 ? (

                    <div className="testimonials-empty">
                        No testimonials available.
                    </div>

                ) : (

                    <div className="testimonials-list">

                        {testimonials.map((testimonial) => (

                            <article
                                key={testimonial.id}
                                className="testimonial-item"
                            >

                                <div className="testimonial-number">
                                    {String(
                                        testimonial.order
                                    ).padStart(2, "0")}
                                </div>


                                <div className="testimonial-main">

                                    <div className="testimonial-top">

                                        <div className="testimonial-person">

                                            {testimonial.image && (
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="testimonial-image"
                                                />
                                            )}

                                            <div>

                                                <h3 className="testimonial-name">
                                                    {testimonial.name}
                                                </h3>

                                                <p className="testimonial-position">
                                                    {testimonial.position}
                                                </p>

                                                {testimonial.company && (
                                                    <p className="testimonial-company">
                                                        {testimonial.company}
                                                    </p>
                                                )}

                                            </div>

                                        </div>


                                        <div className="testimonial-rating">

                                            {"★".repeat(
                                                Math.min(
                                                    5,
                                                    Math.max(
                                                        0,
                                                        testimonial.rating || 0
                                                    )
                                                )
                                            )}

                                            {"☆".repeat(
                                                5 -
                                                Math.min(
                                                    5,
                                                    Math.max(
                                                        0,
                                                        testimonial.rating || 0
                                                    )
                                                )
                                            )}

                                        </div>

                                    </div>


                                    <p className="testimonial-text">
                                        "{testimonial.content}"
                                    </p>


                                    {testimonial.featured && (
                                        <span className="testimonial-featured">
                                            Featured
                                        </span>
                                    )}

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}

export default TestimonialsSection;