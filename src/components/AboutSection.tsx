import { useEffect, useState } from "react";
import { getAbout } from "../services/aboutService";
import type { About } from "../types/about";
import api from "../services/api";

interface UserProfile {
    id: number;
    name: string;
    email: string;
    education: string;
}

function AboutSection() {
    const [about, setAbout] = useState<About | null>(null);
    const [userProfile, setUserProfile] =
        useState<UserProfile | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const [aboutData, userProfileResponse] =
                    await Promise.all([
                        getAbout(),
                        api.get<UserProfile>("/user-profile"),
                    ]);

                setAbout(aboutData);
                setUserProfile(userProfileResponse.data);
            } catch (err) {
                console.error("Failed to load About:", err);
                setError("Unable to load About section.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <section className="about-section">
                <div className="about-loading">
                    Loading About...
                </div>
            </section>
        );
    }

    if (error || !about) {
        return (
            <section className="about-section">
                <div className="about-error">
                    {error || "About section not found."}
                </div>
            </section>
        );
    }

    return (
        <section className="about-section">

            {/* Section Header */}
            <div className="about-header">
                <div className="about-label">
                    <span>02</span>
                    <span>ABOUT</span>
                </div>

                <div className="about-line"></div>
            </div>

            {/* Main Content */}
            <div className="about-layout">

                {/* Left */}
                <div className="about-title-area">

                    <p className="about-small-title">
                        {about.shortDescription}
                    </p>

                    <h2 className="about-title">
                        {about.heading}
                    </h2>

                </div>

                {/* Right */}
                <div className="about-content">

                    {/* About Description */}
                    <p className="about-description">
                        {about.description}
                    </p>

                    {/* Profile Image */}
                    {about.profileImage && (
                        <div className="about-image-wrapper">
                            <img
                                src={about.profileImage}
                                alt={about.heading}
                                className="about-image"
                            />
                        </div>
                    )}

                    {/* Education */}
                    {userProfile?.education && (
                        <div className="about-education">

                            {/* <div className="about-education-label">
                                EDUCATION
                            </div> */}

                            <div className="about-education-content">
                                <h3>
                                    {userProfile.education}
                                </h3>
                            </div>

                        </div>
                    )}

                    {/* Resume */}
                    {about.resumeUrl && (
                        <a
                            href={about.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about-resume"
                        >
                            <span>
                                View Resume
                            </span>

                            <span className="about-resume-arrow">
                                ↗
                            </span>
                        </a>
                    )}

                </div>
            </div>
        </section>
    );
}

export default AboutSection;