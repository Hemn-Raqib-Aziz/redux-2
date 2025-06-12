import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../features/user/UsersSlice";
import { selectPostsByUserId } from "../features/Post/PostSlice";
import { motion } from "framer-motion";
import PostCards from "../components/Posts/PostCard";
import '../CSS/Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const user = useSelector(state => selectUserById(state, userId));
  const userPosts = useSelector(state => selectPostsByUserId(state, userId));

  const getInitials = (name) => name?.substring(0, 2).toUpperCase();

  if (!user) {
    return (
      <motion.div 
        className="profile-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-card error-card">
          <div className="error-content">
            <h1>User Not Found</h1>
            <p>The user profile you're looking for doesn't exist or has been removed.</p>
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
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navigation */}
      <motion.div 
        className="profile-navigation"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Link to="/" className="back-link">
          ← Back to Posts
        </Link>
      </motion.div>

      {/* Profile Header Card */}
      <motion.div 
        className="profile-card profile-header-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.2,
          duration: 0.7,
          ease: "easeOut"
        }}
      >
        <div className="profile-overlay"></div>
        
        <div className="profile-header-content">
          <motion.div 
            className="profile-avatar-section"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="profile-avatar-large">
              {getInitials(user.name)}
            </div>
            <div className="profile-basic-info">
              <h1 className="profile-name">{user.name}</h1>
              <p className="profile-username">@{user.username}</p>
            </div>
          </motion.div>

          <motion.div 
            className="profile-details"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="profile-detail-grid">
              <div className="profile-detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{user.email}</span>
              </div>
              <div className="profile-detail-item">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{user.phone}</span>
              </div>
              <div className="profile-detail-item">
                <span className="detail-label">City</span>
                <span className="detail-value">{user.city}</span>
              </div>
              <div className="profile-detail-item">
                <span className="detail-label">Street</span>
                <span className="detail-value">{user.street}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="profile-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="stat-item">
              <span className="stat-number">{userPosts.length}</span>
              <span className="stat-label">Posts</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Posts Section */}
      <motion.div 
        className="profile-posts-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <div className="posts-header">
          <h2 className="posts-title">Posts by {user.name}</h2>
          <div className="posts-count">{userPosts.length} posts</div>
        </div>

        {userPosts.length > 0 ? (
          <motion.div 
            className="posts-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {userPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.9 + (index * 0.1),
                  duration: 0.5 
                }}
              >
                <PostCards post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="no-posts-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="no-posts-content">
              <h3>No Posts Yet</h3>
              <p>{user.name} hasn't published any posts yet.</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Profile;