import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FaBars, 
  FaTimes, 
  FaChevronDown, 
  FaUser, 
  FaSignOutAlt, 
  FaCalendarAlt
} from "react-icons/fa";
import acpLogo from '/src/assets/acp-logo-and-hero-img/acp-logo-fullName-white.png';
import { supabase } from '../services/supabaseClient';
import AuthModal from './AuthModal';
import PropTypes from 'prop-types';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Get user session on component mount
  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setCurrentUser(session?.user || null);
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle submenu
  const toggleSubMenu = (menu) => {
    setIsSubMenuOpen(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [menu]: !prev[menu]
    }));
  };

  // Close menus when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSubMenuOpen({});
  }, [location]);

  // Check if link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // NavLink component
  const NavLink = ({ to, children, className = "", onClick }) => (
    <Link
      to={to}
      className={`block py-2 px-4 text-white hover:bg-red-600 rounded-md transition-all duration-200 ${
        isActiveLink(to) ? "bg-red-700 font-semibold" : "font-medium"
      } ${className}`}
      aria-current={isActiveLink(to) ? "page" : undefined}
      onClick={(e) => {
        if (onClick) onClick(e);
        setIsMenuOpen(false);
      }}
    >
      {children}
    </Link>
  );

  NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  // Dropdown button component
  const DropdownButton = ({ children, onClick, isOpen }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full py-2 px-4 text-white hover:bg-red-600 font-medium rounded-md transition-all duration-200 ${
        isOpen ? "bg-red-700" : ""
      }`}
      aria-expanded={isOpen}
    >
      {children}
      <FaChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`} />
    </button>
  );

  DropdownButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  };

  // Calendar button component
  const CalendarButton = ({ isMobile = false }) => (
    <button
      onClick={() => navigate("/events")}
      className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors duration-200 ${
        isMobile ? "w-full bg-red-700 hover:bg-red-800 text-white" : "bg-white hover:bg-gray-100 text-red-700"
      } font-semibold`}
    >
      <FaCalendarAlt className="w-4 h-4" />
      <span>Calendar</span>
    </button>
  );

  CalendarButton.propTypes = {
    isMobile: PropTypes.bool
  };

  // Get user avatar URL
  const getAvatarUrl = () => {
    if (!currentUser) return null;
    return (
      currentUser.user_metadata?.avatar_url ||
      (currentUser.app_metadata?.provider === 'google' && currentUser.user_metadata?.picture) ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.email}`
    );
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-black sticky top-0 z-50 shadow-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20" ref={menuRef}>
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center h-full"
          aria-label="Home"
          onClick={() => setIsMenuOpen(false)}
        >
          <img 
            src={acpLogo} 
            alt="Arts Council Logo" 
            className="h-16 sm:h-16 md:h-14 w-auto object-contain transition-transform duration-200 hover:scale-105" 
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-2">
          <li><NavLink to="/">Home</NavLink></li>
          
          <li className="relative">
            <DropdownButton 
              onClick={() => toggleSubMenu("about")} 
              isOpen={isSubMenuOpen["about"]}
            >
              About
            </DropdownButton>
            {isSubMenuOpen["about"] && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl z-40">
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/governingBody">Governing Body</NavLink>
                <NavLink to="/teamMembers">Our Team</NavLink>
              </div>
            )}
          </li>
          
          <li className="relative">
            <DropdownButton 
              onClick={() => toggleSubMenu("initiatives")} 
              isOpen={isSubMenuOpen["initiatives"]}
            >
              Initiatives
            </DropdownButton>
            {isSubMenuOpen["initiatives"] && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl z-40">
                <NavLink to="/festival/wcf">World Culture Festival</NavLink>
                <NavLink to="/festival/auc">Aalmi Urdu Conference</NavLink>
                <NavLink to="/festival/plf">Pakistan Literature Festival</NavLink>
              </div>
            )}
          </li>
          
          <li><NavLink to="/sovapa">SOVAPA</NavLink></li>
          <li><NavLink to="/facilities">Facilities</NavLink></li>
          
          <li className="relative">
            <DropdownButton 
              onClick={() => toggleSubMenu("resources")} 
              isOpen={isSubMenuOpen["resources"]}
            >
              Resources
            </DropdownButton>
            {isSubMenuOpen["resources"] && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl z-40">
                <NavLink to="/membersVerification">Membership Verification</NavLink>
                <NavLink to="/career">Career</NavLink>
                <NavLink to="/tenders">Tenders</NavLink>
              </div>
            )}
          </li>
          
          <li><NavLink to="/contactUs">Contact Us</NavLink></li>
          
          <li>
            <CalendarButton />
          </li>

          {/* Auth Section */}
          <li>
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <img
                    src={getAvatarUrl()}
                    className="w-10 h-10 rounded-full object-cover border-2 border-red-600 cursor-pointer"
                    alt="User avatar"
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                    <div className="p-3 border-b border-gray-700">
                      <p className="font-medium">{currentUser.user_metadata?.full_name || currentUser.email}</p>
                    </div>
                    <NavLink 
                      to="/dashboard" 
                      className="block text-left hover:bg-red-600 rounded-t-lg"
                    >
                      Dashboard
                    </NavLink>
                    <NavLink 
                      to="/profile" 
                      className="block text-left hover:bg-red-600"
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      disabled={loading}
                      className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-red-600 rounded-b-lg disabled:opacity-50"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      {loading ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                disabled={loading}
                className="flex items-center gap-2 py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-200 font-medium disabled:opacity-50"
              >
                <FaUser className="w-4 h-4" />
                {loading ? 'Loading...' : 'Sign In'}
              </button>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="lg:hidden text-white focus:outline-none transition-transform duration-200 hover:scale-110"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          disabled={loading}
        >
          {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[4rem] sm:top-[5rem] bg-gray-900 px-4 pt-4 pb-6 shadow-2xl z-40 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <ul className="space-y-2">
            <li><NavLink to="/">Home</NavLink></li>
            
            <li>
              <DropdownButton 
                onClick={() => toggleSubMenu("about")} 
                isOpen={isSubMenuOpen["about"]}
              >
                About
              </DropdownButton>
              {isSubMenuOpen["about"] && (
                <div className="pl-4 space-y-2">
                  <NavLink to="/about">About Us</NavLink>
                  <NavLink to="/governingBody">Governing Body</NavLink>
                  <NavLink to="/teamMembers">Our Team</NavLink>
                </div>
              )}
            </li>
            
            <li>
              <DropdownButton 
                onClick={() => toggleSubMenu("initiatives")} 
                isOpen={isSubMenuOpen["initiatives"]}
              >
                Initiatives
              </DropdownButton>
              {isSubMenuOpen["initiatives"] && (
                <div className="pl-4 space-y-2">
                  <NavLink to="/festival/wcf">World Culture Festival</NavLink>
                  <NavLink to="/festival/auc">Aalmi Urdu Conference</NavLink>
                  <NavLink to="/festival/plf">Pakistan Literature Festival</NavLink>
                </div>
              )}
            </li>
            
            <li><NavLink to="/sovapa">SOVAPA</NavLink></li>
            <li><NavLink to="/facilities">Facilities</NavLink></li>
            
            <li>
              <DropdownButton 
                onClick={() => toggleSubMenu("resources")} 
                isOpen={isSubMenuOpen["resources"]}
              >
                Resources
              </DropdownButton>
              {isSubMenuOpen["resources"] && (
                <div className="pl-4 space-y-2">
                  <NavLink to="/membersVerification">Membership Verification</NavLink>
                  <NavLink to="/career">Career</NavLink>
                  <NavLink to="/tenders">Tenders</NavLink>
                </div>
              )}
            </li>
            
            <li><NavLink to="/contactUs">Contact Us</NavLink></li>
            
            <li>
              <CalendarButton isMobile />
            </li>
            
            {/* Mobile Auth Section */}
            <li className="pt-2 border-t border-gray-700">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <img
                      src={getAvatarUrl()}
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-600"
                      alt="User avatar"
                    />
                    <div>
                      <p className="text-white font-medium">{currentUser.user_metadata?.full_name || currentUser.email}</p>
                    </div>
                  </div>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <NavLink to="/profile">Profile</NavLink>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    {loading ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMenuOpen(false);
                  }}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  <FaUser className="w-4 h-4" />
                  {loading ? 'Loading...' : 'Sign In'}
                </button>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={(user) => {
            setCurrentUser(user);
            setShowAuthModal(false);
          }}
        />
      )}
    </header>
  );
};

export default Navbar;