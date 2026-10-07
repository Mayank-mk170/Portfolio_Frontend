import { useEffect, useState } from "react";
import { getExperiences } from "../services/experienceService";
import type { Experience } from "../types/experience";

function ExperienceSection() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadExperiences = async () => {
            try {
                const data = await getExperiences();

                const sortedExperiences = [...data].sort(
                    (a, b) => a.order - b.order
                );

                setExperiences(sortedExperiences);
            } catch (err) {
                console.error("Failed to load experience:", err);
                setError("Unable to load Experience section.");
            } finally {
                setLoading(false);
            }
        };

        loadExperiences();
    }, []);

    const formatDate = (date: string | null) => {
        if (!date) {
            return "Present";
        }

        const [year, month] = date.split("-");

        const dateObject = new Date(
            Number(year),
            Number(month) - 1
        );

        return dateObject.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <section
                className="experience-section"
                id="experience"
            >
                <div className="experience-loading">
                    Loading Experience...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section
                className="experience-section"
                id="experience"
            >
                <div className="experience-error">
                    {error}
                </div>
            </section>
        );
    }

    return (
        <section
            className="experience-section"
            id="experience"
        >

            {/* Section Header */}
            <div className="experience-header">

                <div className="experience-label">
                    <span>04</span>
                    <span>EXPERIENCE</span>
                </div>

                <div className="experience-line"></div>

            </div>

            {/* Section Content */}
            <div className="experience-content">

                <div className="experience-intro">

                    <h2 className="experience-title">
                        My Experience
                    </h2>

                    <p className="experience-description">
                        Professional experience and roles
                        that have shaped my development journey.
                    </p>

                </div>

                {experiences.length === 0 ? (
                    <div className="experience-empty">
                        No experience available.
                    </div>
                ) : (
                    <div className="experience-list">

                        {experiences.map((experience) => (
                            <article
                                key={experience.id}
                                className="experience-item"
                            >

                                <div className="experience-number">
                                    {String(
                                        experience.order
                                    ).padStart(2, "0")}
                                </div>

                                <div className="experience-main">

                                    <div className="experience-top">

                                        <div>
                                            <h3 className="experience-position">
                                                {experience.position}
                                            </h3>

                                            <p className="experience-company">
                                                {experience.company}
                                            </p>
                                        </div>

                                        <div className="experience-duration">
                                            {formatDate(
                                                experience.startDate
                                            )}

                                            {" — "}

                                            {experience.currentlyWorking
                                                ? "Present"
                                                : formatDate(
                                                    experience.endDate
                                                )}
                                        </div>

                                    </div>

                                    {experience.description && (
                                        <p className="experience-text">
                                            {experience.description}
                                        </p>
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

export default ExperienceSection;