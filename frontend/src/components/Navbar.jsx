import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaUser, FaSignOutAlt, FaCog, FaHome, FaUserCircle } from "react-icons/fa";
import PropTypes from 'prop-types';
import acpLogo from '/src/assets/acp-logo-and-hero-img/acp-logo-fullName-white.png';
import { supabase } from '../services/supabaseClient';
import AuthModal from '../components/AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setCurrentUser(session?.user || null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false);
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsSubMenuOpen({});
      setIsUserMenuOpen(false);
    }
  };

  const toggleSubMenu = (menu, event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsSubMenuOpen((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [menu]: !prev[menu],
    }));
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const showLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  const showSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsSubMenuOpen({});
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSubMenuOpen({});
    setIsUserMenuOpen(false);
  }, [location]);

  const isActiveLink = (path) => location.pathname === path;

  const NavLink = ({ to, children, className = "", ...props }) => (
    <Link
      to={to}
      className={`block py-2 px-4 text-white hover:bg-red-800 hover:text-white rounded-md transition-all duration-300 ease-in-out ${
        isActiveLink(to) ? "bg-red-700 font-semibold" : "font-medium"
      } ${className}`}
      {...props}
    >
      {children}
    </Link>
  );

  NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  const DropdownButton = ({ children, onClick, isOpen, className = "", ...props }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full py-2 px-4 text-white hover:bg-red-800 hover:text-white font-medium rounded-md transition-all duration-300 ease-in-out ${
        isOpen ? "bg-red-700" : ""
      } ${className}`}
      {...props}
    >
      {children}
      <FaChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ease-in-out ${
        isOpen ? "rotate-180" : ""
      }`} />
    </button>
  );

  DropdownButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string
  };

  return (
    <header className="bg-gradient-to-r from-black/95 to-gray-900 sticky top-0 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20" ref={menuRef}>
        {/* Logo */}
        <Link to="/" className="flex items-center h-full">
          <img 
            src={acpLogo} 
            alt="Arts Council Logo" 
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          <ul className="flex items-center space-x-1">
            <li><NavLink to="/">Home</NavLink></li>
            <li className="relative group">
              <DropdownButton onClick={(e) => toggleSubMenu("about", e)} isOpen={isSubMenuOpen["about"]}>About</DropdownButton>
              {isSubMenuOpen["about"] && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-gray-900 rounded-lg shadow-xl z-40 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                  <NavLink to="/about">About Us</NavLink>
                  <NavLink to="/GoverningBody">Governing Body</NavLink>
                  <NavLink to="/TeamMembers">Our Team</NavLink>
                </div>
              )}
            </li>
            <li className="relative group">
              <DropdownButton onClick={(e) => toggleSubMenu("production", e)} isOpen={isSubMenuOpen["production"]}>Initiatives</DropdownButton>
              {isSubMenuOpen["production"] && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-gray-900 rounded-lg shadow-xl z-40 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
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
                <div className="absolute top-full left-0 mt-1 w-64 bg-gray-900 rounded-lg shadow-xl z-40 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                  <NavLink to="#">Membership Verification</NavLink>
                  <NavLink to="#">Career</NavLink>
                  <NavLink to="#">Tenders</NavLink>
                </div>
              )}
            </li>
            <li><NavLink to="/ContactUs">Contact Us</NavLink></li>
          </ul>

          {/* Auth Button */}
          <div className="relative ml-2" ref={userMenuRef}>
            {currentUser ? (
              <>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 py-2 px-3 rounded-full hover:bg-gray-800 transition-all duration-300"
                  aria-label="User menu"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.email}`}
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    alt="User avatar"
                  />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-gray-900 shadow-xl rounded-lg z-50 overflow-hidden transition-all duration-300 ease-in-out">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-semibold truncate">{currentUser.email}</p>
                    </div>
                    <NavLink 
                      to="/dashboard" 
                      className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-none"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaHome className="w-4 h-4" />
                      Dashboard
                    </NavLink>
                    <NavLink 
                      to="/profile" 
                      className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-none"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaUserCircle className="w-4 h-4" />
                      Profile
                    </NavLink>
                    <NavLink 
                      to="/settings" 
                      className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-none"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaCog className="w-4 h-4" />
                      Settings
                    </NavLink>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={showLogin}
                  className="flex items-center gap-2 py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-300 ease-in-out font-medium"
                >
                  <FaUser className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={showSignup}
                  className="flex items-center gap-2 py-2 px-4 text-red-600 bg-white hover:bg-gray-100 rounded-md transition-all duration-300 ease-in-out font-medium"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden gap-4">
          {currentUser ? (
            <button
              onClick={toggleUserMenu}
              className="relative"
              aria-label="User menu"
            >
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.email}`}
                className="w-8 h-8 rounded-full border-2 border-gray-300"
                alt="User avatar"
              />
            </button>
          ) : (
            <button
              onClick={showLogin}
              className="flex items-center justify-center w-8 h-8 text-white bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300"
              aria-label="Login"
            >
              <FaUser className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none transition-transform duration-300 hover:scale-110"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 px-4 pt-2 pb-6 shadow-xl animate-fadeIn">
          <ul className="space-y-1">
            <li><NavLink to="/">Home</NavLink></li>
            <li>
              <DropdownButton onClick={(e) => toggleSubMenu("about", e)} isOpen={isSubMenuOpen["about"]}>About</DropdownButton>
              {isSubMenuOpen["about"] && (
                <div className="pl-4 space-y-1 mt-1">
                  <NavLink to="/about">About Us</NavLink>
                  <NavLink to="/GoverningBody">Governing Body</NavLink>
                  <NavLink to="/TeamMembers">Our Team</NavLink>
                </div>
              )}
            </li>
            <li>
              <DropdownButton onClick={(e) => toggleSubMenu("production", e)} isOpen={isSubMenuOpen["production"]}>Initiatives</DropdownButton>
              {isSubMenuOpen["production"] && (
                <div className="pl-4 space-y-1 mt-1">
                  <NavLink to="/festival/wcf">World Culture Festival</NavLink>
                  <NavLink to="/festival/auc">Aalmi Urdu Conference</NavLink>
                  <NavLink to="/festival/plf">Pakistan Literature Festival</NavLink>
                </div>
              )}
            </li>
            <li><NavLink to="/sovapa">SOVAPA</NavLink></li>
            <li><NavLink to="/facilities">Facilities</NavLink></li>
            <li>
              <DropdownButton onClick={(e) => toggleSubMenu("resources", e)} isOpen={isSubMenuOpen["resources"]}>Resources</DropdownButton>
              {isSubMenuOpen["resources"] && (
                <div className="pl-4 space-y-1 mt-1">
                  <NavLink to="#">Membership Verification</NavLink>
                  <NavLink to="#">Career</NavLink>
                  <NavLink to="#">Tenders</NavLink>
                </div>
              )}
            </li>
            <li><NavLink to="/ContactUs">Contact Us</NavLink></li>
            {!currentUser && (
              <li className="flex gap-2 pt-2">
                <button
                  onClick={showLogin}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-300 font-medium"
                >
                  <FaUser className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={showSignup}
                  className="flex-1 py-2 px-4 text-red-600 bg-white hover:bg-gray-100 rounded-md transition-all duration-300 font-medium"
                >
                  Sign Up
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Mobile User Menu (similar to Coursera) */}
      {isUserMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl animate-slideUp">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.email}`}
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                  alt="User avatar"
                />
                <div>
                  <p className="font-semibold text-gray-900">{currentUser.email}</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <NavLink 
                to="/dashboard" 
                className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <FaHome className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </NavLink>
              <NavLink 
                to="/profile" 
                className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <FaUserCircle className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </NavLink>
              <NavLink 
                to="/settings" 
                className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <FaCog className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </NavLink>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mt-2"
              >
                <FaSignOutAlt className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
            <div className="p-4 border-t border-gray-200 text-center">
              <button 
                onClick={() => setIsUserMenuOpen(false)}
                className="text-gray-500 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleLoginSuccess}
          onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        />
      )}
    </header>
  );
};

export default Navbar;