import { useEffect, useState } from "react";
import { getSkills } from "../services/skillService";
import type { Skill } from "../types/skill";

function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadSkills = async () => {
            try {
                const data = await getSkills();
                setSkills(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load skills.");
            } finally {
                setLoading(false);
            }
        };

        loadSkills();
    }, []);

    if (loading) {
        return (
            <section className="skills-section">
                <div className="skills-loading">
                    Loading Skills...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="skills-section">
                <div className="skills-error">
                    {error}
                </div>
            </section>
        );
    }

    return (
        <section className="skills-section">

            {/* Header */}

            <div className="skills-header">

                <div className="skills-label">
                    <span>03</span>
                    <span>SKILLS</span>
                </div>

                <div className="skills-line"></div>

            </div>


            {/* Intro */}

            <div className="skills-intro">

                <h2>
                   Skills
                </h2>

                

            </div>


            {/* Skills */}

            <div className="skills-list">

                {skills.map((skill, index) => (
                    <div
                        className="skill-row"
                        key={skill.id}
                    >

                        {/* Number */}

                        <div className="skill-number">
                            {String(index + 1).padStart(2, "0")}
                        </div>


                        {/* Name */}

                        <div className="skill-name-area">

                            <h3>
                                {skill.name}
                            </h3>

                            {skill.category && (
                                <span>
                                    {skill.category}
                                </span>
                            )}

                        </div>


                        {/* Progress */}

                        <div className="skill-progress-area">

                            <div className="skill-progress">

                                <div
                                    className="skill-progress-bar"
                                    style={{
                                        width: `${skill.proficiency}%`,
                                    }}
                                />

                            </div>

                        </div>


                        {/* Percentage */}

                        <div className="skill-percentage">
                            {skill.proficiency}%
                        </div>


                        {/* Icon */}

                        {skill.icon && (
                            <div className="skill-icon">
                                {skill.icon}
                            </div>
                        )}

                    </div>
                ))}

            </div>

        </section>
    );
}

export default SkillsSection;