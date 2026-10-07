import { useEffect, useState } from "react";
import { getServices } from "../services/serviceService";
import type { PortfolioService } from "../types/service";

function ServicesSection() {
    const [services, setServices] = useState<PortfolioService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await getServices();

                const sortedServices = [...data].sort(
                    (a, b) => a.order - b.order
                );

                setServices(sortedServices);
            } catch (err) {
                console.error("Failed to load services:", err);
                setError("Unable to load Services section.");
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    if (loading) {
        return (
            <section
                className="services-section"
                id="services"
            >
                <div className="services-loading">
                    Loading Services...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section
                className="services-section"
                id="services"
            >
                <div className="services-error">
                    {error}
                </div>
            </section>
        );
    }

    return (
        <section
            className="services-section"
            id="services"
        >

            {/* Section Header */}
            <div className="services-header">

                <div className="services-label">
                    <span>05</span>
                    <span>SERVICES</span>
                </div>

                <div className="services-line"></div>

            </div>

            {/* Section Content */}
            <div className="services-content">

                <div className="services-intro">

                    <h2 className="services-title">
                        What I Do
                    </h2>

                    <p className="services-description">
                        Services and solutions I provide for
                        modern web applications.
                    </p>

                </div>

                {services.length === 0 ? (
                    <div className="services-empty">
                        No services available.
                    </div>
                ) : (
                    <div className="services-list">

                        {services.map((service) => (
                            <article
                                key={service.id}
                                className="service-item"
                            >

                                <div className="service-number">
                                    {String(
                                        service.order
                                    ).padStart(2, "0")}
                                </div>

                                <div className="service-main">

                                    <div className="service-top">

                                        <div className="service-heading">

                                            {service.icon && (
                                                <img
                                                    src={service.icon}
                                                    alt=""
                                                    className="service-icon"
                                                />
                                            )}

                                            <h3 className="service-title">
                                                {service.title}
                                            </h3>

                                        </div>

                                        <span className="service-arrow">
                                            ↗
                                        </span>

                                    </div>

                                    <p className="service-text">
                                        {service.description}
                                    </p>

                                    {service.image && (
                                        <div className="service-image-wrapper">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="service-image"
                                            />
                                        </div>
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

export default ServicesSection;