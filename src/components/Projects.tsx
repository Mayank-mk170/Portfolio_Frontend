import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import type { Project } from "../types/project";

interface ProjectImageCarouselProps {
    imageUrl: string;
    title: string;
}

function ProjectImageCarousel({
    imageUrl,
    title,
}: ProjectImageCarouselProps) {

    const images = imageUrl
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean);

    const [currentIndex, setCurrentIndex] = useState(0);

    if (images.length === 0) {
        return null;
    }

    const hasMultipleImages = images.length > 1;

    const handlePrevious = () => {
        setCurrentIndex((previous) =>
            previous === 0
                ? images.length - 1
                : previous - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((previous) =>
            previous === images.length - 1
                ? 0
                : previous + 1
        );
    };

    return (
        <div className="project-image-wrapper">

            <img
                src={images[currentIndex]}
                alt={`${title} - image ${currentIndex + 1}`}
                className="project-image"
            />

            {hasMultipleImages && (
                <>
                    {/* PREVIOUS BUTTON */}
                    <button
                        type="button"
                        className="project-image-nav project-image-prev"
                        onClick={handlePrevious}
                        aria-label="Previous project image"
                    >
                        ←
                    </button>

                    {/* NEXT BUTTON */}
                    <button
                        type="button"
                        className="project-image-nav project-image-next"
                        onClick={handleNext}
                        aria-label="Next project image"
                    >
                        →
                    </button>

                    {/* IMAGE INDICATORS */}
                    <div className="project-image-indicators">
                        {images.map((_, index) => (
                            <button
                                type="button"
                                key={index}
                                className={
                                    index === currentIndex
                                        ? "project-image-dot active"
                                        : "project-image-dot"
                                }
                                onClick={() =>
                                    setCurrentIndex(index)
                                }
                                aria-label={`Show image ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* IMAGE COUNT */}
                    <div className="project-image-count">
                        {currentIndex + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
}


function Projects() {

    const [projects, setProjects] =
        useState<Project[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        const loadProjects = async () => {

            try {

                const data = await getProjects();

                const sortedProjects =
                    [...data].sort(
                        (a, b) =>
                            a.displayOrder -
                            b.displayOrder
                    );

                setProjects(sortedProjects);

            } catch (err) {

                console.error(
                    "Failed to load projects:",
                    err
                );

                setError(
                    "Unable to load projects."
                );

            } finally {

                setLoading(false);

            }
        };

        loadProjects();

    }, []);


    /* ==========================================
       LOADING
    ========================================== */

    if (loading) {

        return (
            <section className="projects-section">

                <div className="projects-header">

                    <span className="projects-label">
                        03 / PROJECTS
                    </span>

                    <h2 className="projects-title">
                        Selected Work
                    </h2>

                    <p className="projects-intro">
                        A selection of projects I have built
                        using modern technologies and
                        development tools.
                    </p>

                </div>

                <div className="projects-status">
                    Loading projects...
                </div>

            </section>
        );
    }


    /* ==========================================
       ERROR
    ========================================== */

    if (error) {

        return (
            <section className="projects-section">

                <div className="projects-header">

                    <span className="projects-label">
                        03 / PROJECTS
                    </span>

                    <h2 className="projects-title">
                        Selected Work
                    </h2>

                    <p className="projects-intro">
                        A selection of projects I have built
                        using modern technologies and
                        development tools.
                    </p>

                </div>

                <div className="projects-status error">
                    {error}
                </div>

            </section>
        );
    }


    /* ==========================================
       PROJECTS
    ========================================== */

    return (
        <section className="projects-section">

            <div className="projects-header">

                <span className="projects-label">
                    03 / PROJECTS
                </span>

                <h2 className="projects-title">
                    Selected Work
                </h2>

                <p className="projects-intro">
                    A selection of projects I have built
                    using modern technologies and
                    development tools.
                </p>

            </div>


            <div className="projects-list">

                {projects.map((project, index) => (

                    <article
                        className="project-row"
                        key={project.id}
                    >

                        {/* PROJECT NUMBER */}

                        <div className="project-index">
                            {String(index + 1).padStart(2, "0")}
                        </div>


                        {/* PROJECT CONTENT */}

                        <div className="project-main">

                            <div className="project-top">

                                <div>

                                    <h3 className="project-title">
                                        {project.title}
                                    </h3>

                                    {project.featured && (
                                        <span className="project-featured">
                                            FEATURED
                                        </span>
                                    )}

                                </div>


                                

                            </div>


                            {/* DESCRIPTION */}

                            <p className="project-description">
                                {project.description}
                            </p>


                            {/* TECHNOLOGIES */}

                            {project.technologies && (

                                <div className="project-technologies">

                                    {project.technologies
                                        .split(",")
                                        .map(
                                            (
                                                technology,
                                                techIndex
                                            ) => (

                                                <span
                                                    key={techIndex}
                                                >
                                                    {technology.trim()}
                                                </span>

                                            )
                                        )}

                                </div>

                            )}


                            {/* LINKS */}

                            <div className="project-links">

                                {project.githubUrl && (

                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub
                                        <span>↗</span>
                                    </a>

                                )}


                                {project.liveUrl && (

                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Live Demo
                                        <span>↗</span>
                                    </a>

                                )}

                            </div>

                        </div>


                        {/* PROJECT IMAGE CAROUSEL */}

                        {project.imageUrl && (

                            <ProjectImageCarousel
                                imageUrl={project.imageUrl}
                                title={project.title}
                            />

                        )}

                    </article>

                ))}

            </div>

        </section>
    );
}


export default Projects;