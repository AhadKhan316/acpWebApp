import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import PropTypes from 'prop-types';
import acpLogo from '/src/assets/acp-logo-and-hero-img/acp-logo-fullName-white.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState({});
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const modalRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');

    // Check authentication status on component mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/signup', {
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data.data.user);
                }
            } catch (error) {
                console.error('Auth check error:', error);
            }
        };

        checkAuthStatus();
    }, []);

    // Auto-focus first input when auth modal opens
    useEffect(() => {
        if (showAuthModal) {
            const firstInputId = isLoginView ? 'email' : 'name';
            setTimeout(() => {
                document.getElementById(firstInputId)?.focus();
            }, 100);
        }
    }, [showAuthModal, isLoginView]);

    // Calculate password strength
    useEffect(() => {
        if (!isLoginView && formData.password) {
            let strength = 0;
            if (formData.password.length >= 8) strength += 1;
            if (/[A-Z]/.test(formData.password)) strength += 1;
            if (/[0-9]/.test(formData.password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
            setPasswordStrength(strength);
        }
    }, [formData.password, isLoginView]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));

        // Clear error when user types
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }));
        }
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!isLoginView && !formData.name) {
            newErrors.name = 'Full name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const endpoint = isLoginView ? '/api/login' : '/api/signup';
            const body = isLoginView
                ? { email: formData.email, password: formData.password }
                : { full_name: formData.name, email: formData.email, password: formData.password };

            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                // Authentication successful
                setShowAuthModal(false);
                setCurrentUser(data.data.user);
                // Reset form
                setFormData({ name: '', email: '', password: '' });
                setErrors({});
                // Refresh to update UI
                window.location.reload();
            } else {
                setAuthError(data.message || 'Authentication failed');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setAuthError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                setCurrentUser(null);
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Forgot password handler
    const handleForgotPassword = () => {
        // Implement your forgot password logic here
        alert('Forgot password functionality will be implemented here');
    };

    // Toggle functions
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const toggleAuthModal = () => {
        setShowAuthModal(!showAuthModal);
        if (!showAuthModal) {
            setIsLoginView(true);
            setFormData({ name: '', email: '', password: '' });
            setErrors({});
            setAuthError('');
        }
    };

    const switchToSignup = () => {
        setIsLoginView(false);
        setAuthError('');
    };

    const switchToLogin = () => {
        setIsLoginView(true);
        setAuthError('');
    };

    const toggleSubMenu = (menu, event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsSubMenuOpen((prev) => ({
            ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
            [menu]: !prev[menu],
        }));
    };

    // Click outside handlers
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                setIsSubMenuOpen({});
            }
            if (modalRef.current && !modalRef.current.contains(event.target) &&
                !event.target.closest('[data-auth-button]')) {
                setShowAuthModal(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reset menus on location change
    useEffect(() => {
        setIsMenuOpen(false);
        setIsSubMenuOpen({});
    }, [location]);

    // Helper components
    const isActiveLink = (path) => location.pathname === path;

    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            className={`block py-2 px-4 text-white hover:text-white hover:bg-red-800 rounded-md transition-colors duration-200 ${isActiveLink(to) ? "text-white font-semibold bg-red-700" : "font-medium"}`}
        >
            {children}
        </Link>
    );

    NavLink.propTypes = {
        to: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    };

    const DropdownButton = ({ children, onClick, isOpen }) => (
        <button
            onClick={onClick}
            className={`flex items-center justify-between w-full py-2 px-4 text-white hover:bg-red-800 font-medium rounded-md transition-colors duration-200 ${isOpen ? "bg-red-700" : ""}`}
        >
            {children}
            <FaChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
    );

    DropdownButton.propTypes = {
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired
    };

    // const SubSubMenuButton = ({ children, onClick, isOpen }) => (
    //     <button
    //         onClick={onClick}
    //         className={`flex items-center justify-between w-full py-2 px-4 text-white hover:bg-red-800 font-medium rounded-md transition-colors duration-200 ${isOpen ? "bg-red-700" : ""}`}
    //     >
    //         {children}
    //         <FaChevronRight className={`ml-2 w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
    //     </button>
    // );



    // Password strength indicator
    
    const PasswordStrengthIndicator = () => {
        if (isLoginView || !formData.password) return null;

        const strengthText = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][passwordStrength];
        const strengthColor = [
            'bg-red-500',
            'bg-orange-500',
            'bg-yellow-500',
            'bg-blue-500',
            'bg-green-500'
        ][passwordStrength];

        return (
            <div className="mt-1">
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${i <= passwordStrength ? strengthColor : 'bg-gray-200'}`}
                        />
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Password strength: {strengthText}
                </p>
            </div>
        );
    };

    return (
        <header className="bg-gradient-to-r from-black/80 to-black/90 sticky top-0 z-50 shadow-md">
            <nav
                className="h-[80px] max-w-screen-xl flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8"
                ref={menuRef}
            >
                {/* Logo */}
                <Link to="/" className="flex items-center h-full">
                    <img
                        src={acpLogo}
                        alt="Arts Council Logo"
                        className="object-contain w-auto max-h-[150px] max-w-[200px] sm:max-h-[150px] lg:max-h-[150px]"
                    />
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden lg:flex space-x-0.5 items-center ms-2">
                    <li><NavLink to="/">Home</NavLink></li>

                    <li className="relative group">
                        <DropdownButton onClick={(e) => toggleSubMenu("about", e)} isOpen={isSubMenuOpen["about"]}>About</DropdownButton>
                        {isSubMenuOpen["about"] && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-black rounded-md z-40">
                                <NavLink to="/about">About Us</NavLink>
                                <NavLink to="/GoverningBody">Governing Body</NavLink>
                                <NavLink to="/TeamMembers">Our Team</NavLink>
                            </div>
                        )}
                    </li>

                    <li className="relative group">
                        <DropdownButton onClick={(e) => toggleSubMenu("production", e)} isOpen={isSubMenuOpen["production"]}>
                            Initiatives
                        </DropdownButton>

                        {isSubMenuOpen["production"] && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-black rounded-md shadow-lg z-40">
                                <NavLink to="/festival/wcf">World Culture Festival</NavLink>
                                <NavLink to="/festival/auc">Aalmi Urdu Conference</NavLink>
                                <NavLink to="/festival/plf">Pakistan Literature Festival</NavLink>
                            </div>
                        )}
                    </li>

                    <li><NavLink to="/sovapa">SOVAPA</NavLink></li>
                    <li><NavLink to="/facilities">Facilities</NavLink></li>

                    <li className="relative group">
                        <DropdownButton onClick={(e) => toggleSubMenu("resources", e)} isOpen={isSubMenuOpen["resources"]}>Resources</DropdownButton>
                        {isSubMenuOpen["resources"] && (
                            <div className="absolute top-full left-0 mt-2 w-54 bg-black rounded-md shadow-lg z-40">
                                <NavLink to="#">Membership Verification</NavLink>
                                <NavLink to="#">Career</NavLink>
                                <NavLink to="#">Tenders</NavLink>
                            </div>
                        )}
                    </li>

                    <li><NavLink to="/ContactUs">Contact Us</NavLink></li>

                    {/* Auth Button */}
                    <li>
                        {currentUser ? (
                            <div className="flex items-center gap-4">
                                <span className="text-white font-medium">{currentUser.full_name || currentUser.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 py-2 px-4 text-white hover:bg-red-800 rounded-md transition-colors duration-200 font-medium"
                                >
                                    <FaUser className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={toggleAuthModal}
                                data-auth-button
                                className="flex items-center gap-2 py-2 px-4 text-white hover:bg-red-800 rounded-md transition-colors duration-200 font-medium"
                            >
                                <FaUser className="w-4 h-4" />
                                Login
                            </button>
                        )}
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="text-white lg:hidden">
                    {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                </button>

                {/* Mobile Menu */}
                <div className={`lg:hidden fixed top-0 right-0 w-4/5 max-w-xs h-full bg-black/95 z-50 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h2 className="text-white font-bold text-lg">Menu</h2>
                        <button onClick={toggleMenu} className="text-white">
                            <FaTimes />
                        </button>
                    </div>
                    <ul className="flex flex-col p-4 space-y-2 text-white">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li className="relative">
                            <DropdownButton onClick={(e) => toggleSubMenu("about", e)} isOpen={isSubMenuOpen["about"]}>About</DropdownButton>
                            {isSubMenuOpen["about"] && (
                                <div className="relative top-full left-0 mt-2 w-64 bg-black rounded-md z-40">
                                    <NavLink to="/about">About Us</NavLink>
                                    <NavLink to="/GoverningBody">Governing Body</NavLink>
                                    <NavLink to="/TeamMembers">Our Team</NavLink>
                                </div>
                            )}
                        </li>

                        <li className="relative group">
                            <DropdownButton onClick={(e) => toggleSubMenu("production", e)} isOpen={isSubMenuOpen["production"]}>
                                Initiatives
                            </DropdownButton>

                            {isSubMenuOpen["production"] && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-black rounded-md shadow-lg z-40">
                                    <NavLink to="/festival/wcf">World Culture Festival</NavLink>
                                    <NavLink to="/festival/auc">Aalmi Urdu Conference</NavLink>
                                    <NavLink to="/festival/plf">Pakistan Literature Festival</NavLink>
                                </div>
                            )}
                        </li>

                        <li><NavLink to="/sovapa">SOVAPA</NavLink></li>
                        <li><NavLink to="/facilities">Facilities</NavLink></li>
                        <li className="relative group">
                            <DropdownButton onClick={(e) => toggleSubMenu("resources", e)} isOpen={isSubMenuOpen["resources"]}>Resources</DropdownButton>
                            {isSubMenuOpen["resources"] && (
                                <div className="relative top-full left-0 mt-2 w-54 bg-black rounded-md shadow-lg z-40">
                                    <NavLink to="#">Membership Verification</NavLink>
                                    <NavLink to="#">Career</NavLink>
                                    <NavLink to="#">Tenders</NavLink>
                                </div>
                            )}
                        </li>
                        <li><NavLink to="/ContactUs">Contact Us</NavLink></li>
                    </ul>

                    {/* Mobile Auth Button */}
                    <div className="p-4">
                        {currentUser ? (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-white bg-red-700 hover:bg-red-800 rounded-md transition-colors duration-200 font-medium"
                            >
                                <FaUser className="w-4 h-4" />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={toggleAuthModal}
                                data-auth-button
                                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-white bg-red-700 hover:bg-red-800 rounded-md transition-colors duration-200 font-medium"
                            >
                                <FaUser className="w-4 h-4" />
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Auth Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 bg-light-800 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl">
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                                {isLoginView ? "Welcome back" : "Sign up"}
                            </h2>

                            {isLoginView ? (
                                // Login Form
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {authError && (
                                        <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded-md">
                                            {authError}
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="name@email.com"
                                            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                                            onClick={handleForgotPassword}
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium text-lg flex justify-center items-center"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : 'Login'}
                                    </button>
                                </form>
                            ) : (
                                // Signup Form
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {authError && (
                                        <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded-md">
                                            {authError}
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="name@email.com"
                                            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Between 8 and 72 characters"
                                            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                                            required
                                            minLength="8"
                                            maxLength="72"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                        <PasswordStrengthIndicator />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium text-lg flex justify-center items-center"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : 'Join for Free'}
                                    </button>
                                </form>
                            )}

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    {/* <div className="relative flex justify-center">
                                        <span className="bg-white px-2 text-sm text-gray-500">or continue with</span>
                                    </div> */}
                                </div>
                                <div className="mt-4 flex justify-center space-x-4">
                                    {/* <button
                                        className="flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 w-full max-w-[120px]"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Add Google auth logic
                                        }}
                                    >
                                        <FaGoogle className="h-5 w-5 text-red-500" />
                                        <span className="ml-2 text-sm font-medium">Google</span>
                                    </button> */}
                                    {/* <button
                                        className="flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 w-full max-w-[120px]"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Add Facebook auth logic
                                        }}
                                    >
                                        <FaFacebookF className="h-5 w-5 text-blue-600" />
                                        <span className="ml-2 text-sm font-medium">Facebook</span>
                                    </button> */}
                                    {/* <button
                                        className="flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 w-full max-w-[120px]"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Add Apple auth logic
                                        }}
                                    >
                                        <FaApple className="h-5 w-5 text-gray-800" />
                                        <span className="ml-2 text-sm font-medium">Apple</span>
                                    </button> */}
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={isLoginView ? switchToSignup : switchToLogin}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                                >
                                    {isLoginView ? "New to ACP? Sign up" : "Already have an account? Log in"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Social Media Sidebar (Desktop Only) */}
            <div className="hidden md:block fixed top-1/2 transform -translate-y-1/2 right-0 z-50">
                <div className="bg-black text-white p-2 rounded-l-lg shadow-lg">
                    <div className="space-y-4">
                        {[
                            {
                                href: "https://www.instagram.com/acpkhiofficial",
                                icon: <FaInstagram className="h-6 w-6" />,
                                alt: "Instagram",
                            },
                            {
                                href: "https://www.facebook.com/ACPKHI/",
                                icon: <FaFacebookF className="h-6 w-6" />,
                                alt: "Facebook",
                            },
                            {
                                href: "https://www.tiktok.com/@acpkhi",
                                icon: <FaTiktok className="h-6 w-6" />,
                                alt: "TikTok",
                            },
                            {
                                href: "https://youtube.com/@acpkhi",
                                icon: <FaYoutube className="h-6 w-6" />,
                                alt: "YouTube",
                            },
                        ].map((item) => (
                            <a
                                key={item.alt}
                                href={item.href}
                                className="block text-white hover:text-red-700 transition duration-300"
                                aria-label={item.alt}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;