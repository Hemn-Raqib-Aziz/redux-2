import { motion } from "framer-motion";
import '../../CSS/Loading.css';

const Loading = ({ message = "Loading..." }) => {
  return (
    <motion.div 
      className="loading-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="loading-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          damping: 25,
          stiffness: 300
        }}
      >
        <div className="loading-overlay"></div>
        
        <div className="loading-content">
          {/* Animated Loading Spinner */}
          <motion.div 
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="spinner-ring"></div>
            <div className="spinner-ring spinner-ring-2"></div>
            <div className="spinner-ring spinner-ring-3"></div>
          </motion.div>

          {/* Loading Message */}
          <motion.div 
            className="loading-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="loading-title">{message}</h2>
            <motion.p 
              className="loading-subtitle"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Please wait while we fetch your content
            </motion.p>
          </motion.div>

          {/* Animated Dots */}
          <div className="loading-dots">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="loading-dot"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loading;