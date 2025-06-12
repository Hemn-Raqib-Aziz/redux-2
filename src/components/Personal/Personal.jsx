import '../../CSS/Personal.css'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";

const Personal = ({ isOpen, onClose }) => {
    

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handleLinkClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            

            {/* Personal Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="personal-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleBackdropClick}
                    >
                        <motion.div 
                            className="personal-modal-container"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ 
                                duration: 0.4,
                                type: "spring",
                                damping: 25,
                                stiffness: 300
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="personal-modal-header">
                                <h2 className="personal-modal-title">
                                    About Hemn Raqib Aziz
                                </h2>
                                <button 
                                    className="personal-close-btn"
                                    onClick={onClose}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="personal-modal-content">
                                <motion.div 
                                    className="personal-info-section"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="personal-summary">
                                        <h3>🎯 Professional Summary</h3>
                                        <p>
                                            Highly skilled, hard-working, self-taught professional and quick learner, 
                                            seeking opportunities in Backend and Frontend development. With over 2 years 
                                            of experience in Full-Stack Web Development, I specialize in building secure, 
                                            scalable web applications with modern technologies.
                                        </p>
                                    </div>

                                    <div className="personal-education">
                                        <h3>🎓 Education</h3>
                                        <p>Bachelor in Computer – IT<br/>College of Science, Salahaddin University</p>
                                    </div>

                                    <div className="personal-skills">
                                        <h3>💻 Core Technologies</h3>
                                        <div className="skills-grid">
                                            <div className="skill-category">
                                                <strong>Frontend:</strong> React, JavaScript (ES6+), TypeScript, Tailwind CSS
                                            </div>
                                            <div className="skill-category">
                                                <strong>Backend:</strong> Node.js, Express, RESTful APIs
                                            </div>
                                            <div className="skill-category">
                                                <strong>Database:</strong> MySQL, SQL Server
                                            </div>
                                            <div className="skill-category">
                                                <strong>Security:</strong> JWT, Bcrypt, Authentication Systems
                                            </div>
                                        </div>
                                    </div>

                                    <div className="personal-projects">
                                        <h3>🚀 Notable Project</h3>
                                        <div className="project-highlight">
                                            <strong>Kurd Pets</strong> - Full-Stack Animal E-commerce Platform
                                            <p>
                                                A complete platform featuring role-based access control, JWT security, 
                                                FIB payment integration, real-time notifications, and comprehensive 
                                                admin panel. Built with React, Node.js, Express, and MySQL.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="personal-links-section"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3>🔗 Get In Touch</h3>
                                    <div className="personal-links">
                                        <button 
                                            className="personal-link-btn github-btn"
                                            onClick={() => handleLinkClick('https://github.com/Hemn-Raqib-Aziz')}
                                        >
                                            <span className="link-icon">🐙</span>
                                            <div className="link-content">
                                                <strong>GitHub</strong>
                                                <small>View my repositories and projects</small>
                                            </div>
                                        </button>

                                        <button 
                                            className="personal-link-btn email-btn"
                                            onClick={() => handleLinkClick('mailto:hemnraqeeb02@gmail.com')}
                                        >
                                            <span className="link-icon">📧</span>
                                            <div className="link-content">
                                                <strong>Email</strong>
                                                <small>hemnraqeeb02@gmail.com</small>
                                            </div>
                                        </button>

                                        <button 
                                            className="personal-link-btn telegram-btn"
                                            onClick={() => handleLinkClick('https://t.me/Hemn_Raqib_Aziz')}
                                        >
                                            <span className="link-icon">✈️</span>
                                            <div className="link-content">
                                                <strong>Telegram</strong>
                                                <small>@Hemn_Raqib_Aziz</small>
                                            </div>
                                        </button>

                                        <button 
                                            className="personal-link-btn whatsapp-btn"
                                            onClick={() => handleLinkClick('https://wa.me/9647511485797')}
                                        >
                                            <span className="link-icon">💬</span>
                                            <div className="link-content">
                                                <strong>WhatsApp</strong>
                                                <small>+964 751 148 5797</small>
                                            </div>
                                        </button>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="personal-location"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <p className="location-text">
                                        📍 <strong>Based in Erbil, Iraq</strong> • Available for remote opportunities
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Personal