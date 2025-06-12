import { useState } from "react"
import { useDispatch } from "react-redux";
import { authorization } from "../../features/auth/AuthSlice";
import { selectAllUsers } from "../../features/user/UsersSlice";
import { useSelector } from "react-redux";
import { toast } from "../UI/Toast";
import { motion } from "framer-motion";
import '../../CSS/LoginForm.css';

const LoginForm = ({ setShowLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    
    let toastId;
    const handleLogin = (e) => {
    e.preventDefault();

    const errors = {};

    // Validate required fields
    if (email.trim() === '') {
        errors.email = "Email is required";
    } 
    if (password.trim() === '') {
        errors.password = "Password is required";
    } 

    // If required fields are missing, show errors and return early
    if (Object.keys(errors).length > 0) {
        toast.remove(toastId);
        toastId = toast.error("Error!");
        setError(errors);
        return;  
    }

    // Both fields are filled, now validate credentials
    const foundUser = users.find((user) => user.email === email);
    
    if (!foundUser) {
        errors.email = "No account found with this email";
    } else if (password !== foundUser.password) {
        errors.password = "Incorrect password";
    }

    // If credential errors exist, show them
    if (Object.keys(errors).length > 0) {
        toast.remove(toastId);
        toastId = toast.error("Error!");
        setError(errors);
        return;  
    }

    // Success - login the user
    setError({});
    toast.remove(toastId);
    toastId = toast.success("Logged in successfully!");
    dispatch(authorization(foundUser));
    setShowLogin(false);
}

    return (
        <motion.form 
            onSubmit={(e) => handleLogin(e)}
            className="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <motion.div 
                className="login-form-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
            >
                <label htmlFor="email">Email</label>
                <input 
                    onChange={(e) => handleEmailChange(e)} 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={email}
                    placeholder="Enter your email"
                    className="login-input"
                />
                {error.email && (
                    <motion.span 
                        className="login-error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {error.email}
                    </motion.span>
                )}
            </motion.div>

            <motion.div 
                className="login-form-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                    <input 
                        autoComplete="off" 
                        onChange={(e) => handlePasswordChange(e)} 
                        type={showPassword ? "text" : "password"}
                        name="password" 
                        id="password" 
                        value={password}
                        placeholder="Enter your password"
                        className="login-input password-input"
                    />
                    <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <svg
                            className="eye-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {showPassword ? (
                                // Eye slash icon (hide password)
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                />
                            ) : (
                                // Eye icon (show password)
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                {error.password && (
                    <motion.span 
                        className="login-error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {error.password}
                    </motion.span>
                )}
            </motion.div>

            <motion.div
                className="login-form-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
            >
                <button type="submit" className="login-submit-btn">
                    Login
                </button>
                <button 
                    type="button" 
                    className="login-back-btn"
                    onClick={() => setShowLogin(false)}
                >
                    Back to Post
                </button>
            </motion.div>
        </motion.form>
    )
}

export default LoginForm