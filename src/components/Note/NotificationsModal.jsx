import { motion, AnimatePresence } from "framer-motion";

const NotificationsModal = ({ isOpen, onClose }) => {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleLinkClick = (url) => {
        window.open(url, '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleBackdropClick}
                >
                    <motion.div 
                        className="modal-container"
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
                        <div className="modal-header">
                            <h2 className="modal-title">Notifications & Data Sources</h2>
                            <button 
                                className="close-btn"
                                onClick={onClose}
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-content">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="notifications-content"
                            >
                                <div className="notification-section">
                                    <h3 className="section-title">📊 Data Sources</h3>
                                    <p className="section-description">
                                        This application fetches data from the following APIs:
                                    </p>
                                    
                                    <div className="api-links">
                                        <motion.button
                                            className="api-link-btn"
                                            onClick={() => handleLinkClick('https://jsonplaceholder.typicode.com/posts')}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="link-icon">🔗</span>
                                            <div className="link-content">
                                                <strong>Posts API</strong>
                                                <small>jsonplaceholder.typicode.com/posts</small>
                                            </div>
                                        </motion.button>

                                        <motion.button
                                            className="api-link-btn"
                                            onClick={() => handleLinkClick('https://jsonplaceholder.typicode.com/users')}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="link-icon">🔗</span>
                                            <div className="link-content">
                                                <strong>Users API</strong>
                                                <small>jsonplaceholder.typicode.com/users</small>
                                            </div>
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="notification-section">
                                    <h3 className="section-title">🔐 Login Information</h3>
                                    <div className="login-info">
                                        <p><strong>How to Login:</strong></p>
                                        <ul className="login-steps">
                                            <li>
                                                <strong>Email:</strong> Use any user's email from the 
                                                <button 
                                                    className="inline-link"
                                                    onClick={() => handleLinkClick('https://jsonplaceholder.typicode.com/users')}
                                                >
                                                    Users API
                                                </button>
                                            </li>
                                            <li>
                                                <strong>Password:</strong> Use the corresponding user's street address from their address data
                                            </li>
                                        </ul>
                                        
                                        <div className="example-section">
                                            <p><strong>Example:</strong></p>
                                            <div className="example-box">
                                                <p>Email: <code>Sincere@april.biz</code></p>
                                                <p>Password: <code>Kulas Light</code></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="notification-section">
                                    <h3 className="section-title">📝 Data Structure Examples</h3>
                                    
                                    <div className="data-examples">
                                        <div className="example-block">
                                            <h4>Post Object:</h4>
                                            <pre className="code-block">
{`{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident...",
  "body": "quia et suscipit\\nsuscipit recusandae..."
}`}
                                            </pre>
                                        </div>

                                        <div className="example-block">
                                            <h4>User Object:</h4>
                                            <pre className="code-block">
{`{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874"
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org"
}`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>

                                <motion.div 
                                    className="close-section"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <button 
                                        className="close-notifications-btn"
                                        onClick={onClose}
                                    >
                                        Got it!
                                    </button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationsModal;