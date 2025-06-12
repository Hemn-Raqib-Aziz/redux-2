import { motion } from "framer-motion";
import { useState } from "react";
import '../../CSS/Error.css'

const Error = ({ 
  error = "Something went wrong", 
  onRetry = null, 
  type = "general",
  showDetails = false 
}) => {
  const [showFullError, setShowFullError] = useState(false);

  const getErrorIcon = () => {
    switch (type) {
      case "network":
        return (
          <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <circle cx="12" cy="17" r=".5" />
            <path d="M12 2v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="m4.93 19.07 1.41-1.41" />
            <path d="M12 20v2" />
            <path d="m19.07 19.07-1.41-1.41" />
            <path d="M20 12h2" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        );
      case "auth":
        return (
          <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <circle cx="12" cy="16" r="1" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        );
      case "404":
        return (
          <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12h6" />
            <path d="M9 16h6" />
            <path d="m14 2-3 3.5L8 2" />
            <path d="M4 7h16" />
            <path d="M6 10v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8" />
          </svg>
        );
      default:
        return (
          <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6" />
            <path d="M9 9l6 6" />
          </svg>
        );
    }
  };

  const getErrorMessage = () => {
    switch (type) {
      case "network":
        return "Network Connection Failed";
      case "auth":
        return "Authentication Required";
      case "404":
        return "Content Not Found";
      default:
        return "Oops! Something Went Wrong";
    }
  };

  const getErrorSubtitle = () => {
    switch (type) {
      case "network":
        return "Please check your internet connection and try again";
      case "auth":
        return "Please log in to continue";
      case "404":
        return "The content you're looking for doesn't exist";
      default:
        return "We encountered an unexpected error";
    }
  };

  return (
    <motion.div 
      className="error-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="error-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          damping: 25,
          stiffness: 300
        }}
      >
        <div className="error-overlay"></div>
        
        <div className="error-content">
          {/* Animated Error Icon */}
          <motion.div 
            className="error-icon-container"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              damping: 20,
              stiffness: 300
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            >
              {getErrorIcon()}
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="error-title">{getErrorMessage()}</h2>
            <p className="error-subtitle">{getErrorSubtitle()}</p>
          </motion.div>

          {/* Error Details */}
          {showDetails && (
            <motion.div 
              className="error-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <button 
                className="error-details-toggle"
                onClick={() => setShowFullError(!showFullError)}
              >
                {showFullError ? "Hide Details" : "Show Details"}
                <motion.svg
                  className="error-details-icon"
                  animate={{ rotate: showFullError ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </button>
              
              {showFullError && (
                <motion.div
                  className="error-details-content"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <code className="error-code">
                    {typeof error === 'string' ? error : JSON.stringify(error, null, 2)}
                  </code>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div 
            className="error-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {onRetry && (
              <motion.button
                className="error-button error-button-primary"
                onClick={onRetry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              >
                <svg className="error-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
                Try Again
              </motion.button>
            )}
            
            <motion.button
              className="error-button error-button-secondary"
              onClick={() => window.location.reload()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <svg className="error-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Refresh Page
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Error;