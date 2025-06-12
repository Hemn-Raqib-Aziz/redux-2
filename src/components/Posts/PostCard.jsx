import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import '../../CSS/PostCard.css';

const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

const PostCard = ({ post, index }) => {
  const getInitials = (name) => name?.substring(0, 2).toUpperCase();

  return (
    <motion.div 
      className="post-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <div className="post-card-content">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (index * 0.1) + 0.2 }}
        >
          <Link to={`/post/${post.id}`} className="post-title-link">
            <h3 className="post-title">{post?.title.slice(0, 20)}</h3>
          </Link>
          
          <p className="post-excerpt">{post?.body.slice(0, 100)}</p>
        </motion.div>

        <motion.div 
          className="post-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (index * 0.1) + 0.3 }}
        >
          <div className="author-section">
            <Link to={`/profile/${post.userId}`} className="author-avatar">
              {getInitials(post?.name)}
              <span className="author-tooltip">{post?.name}</span>
            </Link>
          </div>
          
          <time className="post-timestamp">
            {formatDate(post?.date)}
          </time>
        </motion.div>
      </div>
      
      <div className="post-card-overlay"></div>
    </motion.div>
  );
};

export default PostCard;