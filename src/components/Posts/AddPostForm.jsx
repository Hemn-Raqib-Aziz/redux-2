import '../../CSS/AddPostForm.css'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../features/Post/PostSlice";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../auth/LoginForm";
import NotificationsModal from "../Note/NotificationsModal";
import { selectAllPosts } from "../../features/Post/PostSlice";
import { toast } from '../UI/Toast';
import Personal from '../Personal/Personal';
import { Logout } from '../../features/auth/AuthSlice';

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isPersonalOpen, setIsPersonalOpen] = useState(false);
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    const auth = useSelector((state) => state.auth);
    const [showLogin, setShowLogin] = useState(false);
    const posts = useSelector(selectAllPosts);
    const nextPostId = posts.length > 0 
  ? Math.max(...posts.map(post => post.id)) + 1 
  : 1;

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    
    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    let toastId;
    const save = (e) => {
        e.preventDefault();
        toast.remove(toastId);
        try {
            if (!auth.auth) {
                setError({ auth: "Not Authorized, Login First" });
                toast.error("Error");
            } else {
                const errors = {};

                if (title.trim() === '') {
                    errors.title = "Title is required";
                }

                if (content.trim() === '') {
                    errors.content = "Content is required";
                }

                if (Object.keys(errors).length > 0) {
                  toast.error("Error");
                    setError(errors);
                } else {
                    dispatch(addPost({id: nextPostId, title, body: content, name: auth.name, userId: auth.id, date: new Date().toISOString()}));
                    setTitle('');
                    setContent('');
                    setError({});
                    toast.success("Post Created Successfully");
                    setIsModalOpen(false);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setError({});
        setShowLogin(false);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const logout = () => {
        dispatch(Logout());
        toastId = toast.success("Logout Successfully");
    }

    return (
        <>
            {/* Static Buttons */}
            <div className="button-container">
                <button 
                    className="trigger-btn primary-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add New Post
                </button>
                {auth.auth && (
                    <button 
                        className="trigger-btn secondary-btn"
                        onClick={() => {
                            logout();
                        }}
                    >
                        Logout
                    </button>
                )}
                {!auth.auth && (
                    <button 
                        className="trigger-btn secondary-btn"
                        onClick={() => {
                            setIsModalOpen(true);
                            setShowLogin(true);
                        }}
                    >
                        Login
                    </button>
                )}
                <button 
                    className="trigger-btn notifications-btn"
                    onClick={() => setIsNotificationsOpen(true)}
                >
                    📊 Data Info
                </button>
                <button 
                className="personal-trigger-btn"
                onClick={() => setIsPersonalOpen(true)}
            >
                👨‍💻 About Me
            </button>
            </div>

            {/* Main Modal */}
            <AnimatePresence>
                {isModalOpen && (
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
                                <h2 className="modal-title">
                                    {showLogin ? 'Login' : 'Create a Post'}
                                </h2>
                                <button 
                                    className="close-btn"
                                    onClick={closeModal}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="modal-content">
                                {!showLogin ? (
                                    <form onSubmit={(e) => save(e)}>
                                        {auth.auth && (
                                            <>
                                                <motion.div 
                                                    className="form-group"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    <label htmlFor="title">Title</label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        id="title"
                                                        onChange={handleTitleChange}
                                                        value={title}
                                                        placeholder="Enter post title"
                                                    />
                                                    {error.title && auth.auth && (
                                                        <motion.span 
                                                            className="error-message"
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                        >
                                                            {error.title}
                                                        </motion.span>
                                                    )}
                                                </motion.div>

                                                <motion.div 
                                                    className="form-group"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <label htmlFor="content">Content</label>
                                                    <textarea
                                                        name="content"
                                                        id="content"
                                                        onChange={handleContentChange}
                                                        value={content}
                                                        placeholder="Enter post content"
                                                        rows="4"
                                                    />
                                                    {error.content && auth.auth && (
                                                        <motion.span 
                                                            className="error-message"
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                        >
                                                            {error.content}
                                                        </motion.span>
                                                    )}
                                                </motion.div>
                                            </>
                                        )}

                                        {error.auth && !auth.auth && (
                                            <motion.span 
                                                className="error-message auth-error"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {error.auth}
                                            </motion.span>
                                        )}

                                        <motion.div 
                                            className="form-actions"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <button type="submit" className="submit-btn">
                                                Add New Post
                                            </button>
                                            {!auth.auth && !showLogin && (
                                                <button 
                                                    type="button" 
                                                    className="login-toggle-btn"
                                                    onClick={() => setShowLogin(true)}
                                                >
                                                    Login
                                                </button>
                                            )}
                                            
                                        </motion.div>
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <LoginForm setShowLogin={setShowLogin}/>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notifications Modal */}
            <NotificationsModal 
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
            />
            
            <Personal 
                isOpen={isPersonalOpen}
                onClose={() => setIsPersonalOpen(false)}
            />
        </>
    )
}

export default AddPostForm