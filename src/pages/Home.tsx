import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import Projects from "../components/Projects";
import ExperienceSection from "../components/ExperienceSection";
import ServicesSection from "../components/ServicesSection";
import BlogsSection from "../components/BlogsSection";
import TestimonialsSection from "../components/TestimonialsSection";


import { submitContact } from "../services/contactService";
import api from "../services/api";


interface About {
    heading: string;
    description: string;
    shortDescription: string;
    profileImage: string;
    resumeUrl: string;

    // Hero Content
    heroEyebrow: string;
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroTitleLine3: string;
    heroDescription: string;
    heroImage: string;
}

interface UserProfile {
    id: number;
    name: string;
    email: string;
    education: string;
}

function Home() {

    const [about, setAbout] =
        useState<About | null>(null);

    useEffect(() => {
        const loadAbout = async () => {
            try {
                const response = await api.get<About>("/about");
                setAbout(response.data);
            } catch (error) {
                console.error("Unable to load About data:", error);
            }
        };

        loadAbout();
    }, []);

    // ========================================
    // USER PROFILE
    // ========================================

    const [userProfile, setUserProfile] =
        useState<UserProfile | null>(null);

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const response = await api.get<UserProfile>(
                    "/user-profile"
                );
                setUserProfile(response.data);
            } catch (error) {
                console.error(
                    "Unable to load User Profile:",
                    error
                );
            }
        };

        loadUserProfile();
    }, []);

    // ========================================
    // CONTACT FORM STATE
    // ========================================

    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
         subject: "",
        message: "",
    });

    const [contactStatus, setContactStatus] =
        useState("");

    const [contactLoading, setContactLoading] =
        useState(false);


    // ========================================
    // CONTACT INPUT CHANGE
    // ========================================

    const handleContactChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value } = event.target;

        setContactForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    // ========================================
    // CONTACT FORM SUBMIT
    // ========================================

    const handleContactSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setContactStatus("");
        setContactLoading(true);

        try {

            await submitContact(contactForm);

            setContactStatus(
                "Message sent successfully."
            );

            setContactForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });

        } catch (error: any) {

            setContactStatus(
                error.response?.data?.message ||
                "Unable to send message. Please try again."
            );

        } finally {

            setContactLoading(false);

        }
    };


    return (
        <div className="portfolio-site">

            {/* ========================================
                NAVBAR
            ======================================== */}

            <header className="site-header">

                <div className="site-header-inner">

                    <a
                        href="#home"
                        className="brand"
                    >

                        <span className="brand-name">
                            {userProfile?.name || "Portfolio"}
                        </span>

                        <span className="brand-subtitle">
                            {about?.shortDescription || "Portfolio"}
                        </span>

                    </a>


                    <nav className="main-nav">

                        <a href="#about">
                            about
                        </a>

                        <a href="#experience">
                            experience
                        </a>

                        <a href="#skills">
                            skills
                        </a>

                        <a href="#work">
                            work
                        </a>

                        <a href="#services">
                            services
                        </a>

                        <a href="#testimonials">
                            testimonials
                        </a>

                        <a href="#blogs">
                            blogs
                        </a>

                        <a href="#contact">
                            contact
                        </a>

                    </nav>

                </div>

            </header>


            {/* ========================================
                HERO
            ======================================== */}

            <main id="home">

                <section className="hero-section">

                    <div className="hero-grid">

                        {/* LEFT */}

                        <div className="hero-left">

                            <p className="hero-eyebrow">
                                {about?.heroEyebrow || ""}
                            </p>


                            <h1 className="hero-title">

                                {about?.heroTitleLine1 || ""}

                                <br />

                                <span className="hero-title-muted">
                                    {about?.heroTitleLine2 || ""}
                                </span>

                                <br />

                                <span className="hero-title-light">
                                    {about?.heroTitleLine3 || ""}
                                </span>

                            </h1>


                            <p className="hero-description">

                                {about?.heroDescription || ""}

                            </p>


                            <div className="hero-actions">

                                <a
                                    href="#work"
                                    className="button button-primary"
                                >
                                    View my work
                                </a>


                                <a
                                    href="#contact"
                                    className="button button-secondary"
                                >
                                    Contact me
                                </a>

                            </div>

                        </div>


                        {/* RIGHT — HERO IMAGE */}

                        <div className="hero-right">

                            {about?.heroImage ? (
                                <div className="hero-image-frame">

                                    <img
                                        src={about.heroImage}
                                        alt={
                                            about.heroEyebrow ||
                                            "Hero"
                                        }
                                        className="hero-image"
                                    />

                                </div>
                            ) : (
                                <div className="hero-image-placeholder">
                                    Upload a Hero Image
                                </div>
                            )}

                        </div>

                    </div>

                </section>


                {/* ========================================
                    ABOUT
                ======================================== */}

                <section
                    id="about"
                    className="cms-section"
                >

                    <AboutSection />

                </section>


                {/* ========================================
                    EXPERIENCE
                ======================================== */}

                <section
                    id="experience"
                    className="cms-section"
                >

                    <ExperienceSection />

                </section>


                {/* ========================================
                    SKILLS
                ======================================== */}

                <section
                    id="skills"
                    className="cms-section"
                >

                    <SkillsSection />

                </section>


                {/* ========================================
                    WORK / PROJECTS
                ======================================== */}

                <section
                    id="work"
                    className="cms-section"
                >

                    <Projects />

                </section>


                {/* ========================================
                    SERVICES
                ======================================== */}

                <section
                    id="services"
                    className="cms-section"
                >

                    <ServicesSection />

                </section>


                {/* ========================================
                    TESTIMONIALS
                ======================================== */}

                <section
                    id="testimonials"
                    className="cms-section"
                >

                    <TestimonialsSection />

                </section>


                {/* ========================================
                    BLOGS
                ======================================== */}

                <section
                    id="blogs"
                    className="cms-section"
                >

                    <BlogsSection />

                </section>


                {/* ========================================
                    CONTACT
                ======================================== */}

                <section
                    id="contact"
                    className="contact-section"
                >

                    <div className="contact-inner">

                        <p className="section-number">
                            04 / CONTACT
                        </p>


                        <h2>

                            Let's build
                            <br />
                            something useful.

                        </h2>


                        <p className="contact-description">

                            Have a project, opportunity or idea?
                            Send me a message.

                        </p>


                        {/* ==================================
                            CONTACT FORM
                        ================================== */}

                        <form
                            className="contact-form"
                            onSubmit={handleContactSubmit}
                        >

                            {/* NAME */}

                            <div className="contact-field">

                                <label htmlFor="contact-name">
                                    Name
                                </label>

                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    value={contactForm.name}
                                    onChange={handleContactChange}
                                    placeholder="Your name"
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="contact-field">

                                <label htmlFor="contact-email">
                                    Email
                                </label>

                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    value={contactForm.email}
                                    onChange={handleContactChange}
                                    placeholder="your@email.com"
                                    required
                                />

                            </div>


                            {/* SUBJECT */}

                            <div className="contact-field">

                                <label htmlFor="contact-subject">
                                    Subject
                                </label>

                                <input
                                    id="contact-subject"
                                    type="text"
                                    name="subject"
                                    value={contactForm.subject}
                                    onChange={handleContactChange}
                                    placeholder="What would you like to discuss?"
                                />

                            </div>


                            {/* MESSAGE */}

                            <div className="contact-field">

                                <label htmlFor="contact-message">
                                    Message
                                </label>

                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={contactForm.message}
                                    onChange={handleContactChange}
                                    placeholder="Write your message..."
                                    rows={6}
                                    required
                                />

                            </div>


                            {/* STATUS */}

                            {contactStatus && (

                                <p className="contact-status">
                                    {contactStatus}
                                </p>

                            )}


                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="contact-submit"
                                disabled={contactLoading}
                            >

                                {contactLoading
                                    ? "Sending..."
                                    : "Send Message ↗"
                                }

                            </button>

                        </form>

                        {/* EMAIL */}

                        {userProfile?.email && (
                            <a
                                href={`mailto:${userProfile.email}`}
                                className="contact-email"
                            >
                                {userProfile.email}
                                <span>↗</span>
                            </a>
                        )}

                    </div>

                </section>

            </main>


            {/* ========================================
                FOOTER
            ======================================== */}

            <footer className="site-footer">

                <span>
                    © {new Date().getFullYear()} {userProfile?.name || "Portfolio"}
                </span>

                <span>
                    Built with React + Spring Boot
                </span>

            </footer>

        </div>
    );
}

export default Home;