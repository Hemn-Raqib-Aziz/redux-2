import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/Post/PostSlice";
import { motion } from "framer-motion";
import '../CSS/BlogDetails.css';

const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const BlogDetails = () => {
  const { postId } = useParams();
  const post = useSelector(state =>
    selectAllPosts(state).find(p => p.id === parseInt(postId))
  );

  const getInitials = (name) => name?.substring(0, 2).toUpperCase();

  if (!post) {
    return (
      <motion.div 
        className="blog-details-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="blog-details-card error-card">
          <div className="error-content">
            <h1>Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="blog-details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="blog-details-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7,
          ease: "easeOut"
        }}
      >
        <div className="blog-details-overlay"></div>
        
        <div className="blog-details-content">
          {/* Navigation */}
          <motion.div 
            className="blog-navigation"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link to="/" className="back-link">
              ← Back to Posts
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header 
            className="blog-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="blog-title">{post.title}</h1>
            
            <div className="blog-meta">
              <div className="author-info">
                <Link to={`/profile/${post.userId}`} className="author-avatar-large">
                  {getInitials(post?.name)}
                  <span className="author-tooltip">{post?.name}</span>
                </Link>
                <div className="author-details">
                  <Link to={`/profile/${post.userId}`} className="author-name">
                    {post.name}
                  </Link>
                  <time className="publish-date">
                    {formatDate(post.date)}
                  </time>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Content */}
          <motion.article 
            className="blog-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="content-body">
              {post.body.split('\n').map((paragraph, index) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.article>

          {/* Footer */}
          <motion.footer 
            className="blog-footer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="footer-actions">
              <Link to={`/profile/${post.userId}`} className="view-profile-btn">
                View Author Profile
              </Link>
              <Link to="/" className="more-posts-btn">
                More Posts
              </Link>
            </div>
          </motion.footer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogDetails;