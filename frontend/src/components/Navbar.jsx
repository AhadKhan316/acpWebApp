import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import PropTypes from 'prop-types';
import acpLogo from '/src/assets/acp-logo-and-hero-img/acp-logo-fullName-white.png';
import { supabase } from '../services/supabaseClient';
import AuthModal from '../components/AuthModal';
// import { toast } from 'react-toastify';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setCurrentUser(session?.user || null);
      } catch (error) {
        toast.error('Error fetching session');
      } finally {
        setIsLoading(false);
      }
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      navigate("/");
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false);
    toast.success('Logged in successfully');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSubMenu = (menu, event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsSubMenuOpen((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [menu]: !prev[menu],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        (!userMenuRef.current || !userMenuRef.current.contains(event.target))
      ) {
        setIsMenuOpen(false);
        setIsSubMenuOpen({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSubMenuOpen({});
  }, [location]);

  const isActiveLink = (path) => location.pathname === path;

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`block py-2 px-4 text-white hover:bg-red-600 hover:text-white rounded-md transition-all duration-300 ease-in-out ${
        isActiveLink(to) ? "bg-red-700 font-semibold" : "font-medium"
      }`}
      aria-current={isActiveLink(to) ? "page" : undefined}
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
      className={`flex items-center justify-between w-full py-2 px-4 text-white hover:bg-red-600 hover:text-white font-medium rounded-md transition-all duration-300 ease-in-out ${
        isOpen ? "bg-red-700" : ""
      }`}
      aria-expanded={isOpen}
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
    isOpen: PropTypes.bool.isRequired
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-black sticky top-0 z-50 shadow-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20" ref={menuRef}>
        {/* Logo */}
        <Link to="/" className="flex items-center h-full" aria-label="Home">
          <img 
            src={acpLogo} 
            alt="Arts Council Logo" 
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105" 
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-2">
          <li><NavLink to="/">Home</NavLink></li>
          <li className="relative group">
            <DropdownButton onClick={(e) => toggleSubMenu("about", e)} isOpen={isSubMenuOpen["about"]}>About</DropdownButton>
            <div className={`absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-2xl z-40 transition-all duration-300 ease-in-out transform ${
              isSubMenuOpen["about"] ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/GoverningBody">Governing Body</NavLink>
              <NavLink to="/TeamMembers">Our Team</NavLink>
            </div>
          </li>
          <li className="relative group">
            <DropdownButton onClick={(e) => toggleSubMenu("production", e)} isOpen={isSubMenuOpen["production"]}>Initiatives</DropdownButton>
            <div className={`absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-2xl z-40 transition-all duration-300 ease-in-out transform ${
              isSubMenuOpen["production"] ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}>
              <NavLink to="/festival/wcf">World Culture Festival</NavLink>
              <NavLink to="/festival/auc">Aalmi Urdu Conference</NavLink>
              <NavLink to="/festival/plf">Pakistan Literature Festival</NavLink>
            </div>
          </li>
          <li><NavLink to="/sovapa">SOVAPA</NavLink></li>
          <li><NavLink to="/facilities">Facilities</NavLink></li>
          <li className="relative group">
            <DropdownButton onClick={(e) => toggleSubMenu("resources", e)} isOpen={isSubMenuOpen["resources"]}>Resources</DropdownButton>
            <div className={`absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-2xl z-40 transition-all duration-300 ease-in-out transform ${
              isSubMenuOpen["resources"] ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}>
              <NavLink to="/membership">Membership Verification</NavLink>
              <NavLink to="/careers">Career</NavLink>
              <NavLink to="/tenders">Tenders</NavLink>
            </div>
          </li>
          <li><NavLink to="/ContactUs">Contact Us</NavLink></li>

          {/* Auth Section */}
          <li ref={userMenuRef}>
            {currentUser ? (
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={currentUser.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.email}`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-red-600 transition-transform duration-300 group-hover:scale-110"
                    alt="User avatar"
                    aria-label="User menu"
                  />
                  <span className="text-white text-sm font-medium hidden xl:block">
                    {currentUser.user_metadata?.full_name || currentUser.email}
                  </span>
                </div>
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white shadow-2xl rounded-lg z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <div className="p-4 border-b border-gray-700">
                    <p className="text-sm font-semibold">{currentUser.user_metadata?.full_name || 'User'}</p>
                    <p className="text-xs text-gray-400">{currentUser.email}</p>
                  </div>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-red-600 rounded-t-lg">Dashboard</Link>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-red-600">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-red-600">Settings</Link>
                  <button 
                    onClick={handleLogout} 
                    disabled={isLoading}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-600 rounded-b-lg disabled:opacity-50"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    {isLoading ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                disabled={isLoading}
                className="flex items-center gap-2 py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-300 font-medium disabled:opacity-50"
              >
                <FaUser className="w-4 h-4" />
                {isLoading ? 'Loading...' : 'Sign In'}
              </button>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="lg:hidden text-white focus:outline-none transition-transform duration-300 hover:scale-110"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 px-4 pt-4 pb-6 shadow-2xl">
          <ul className="space-y-2">
            <li><NavLink to="/">Home</NavLink></li>
            <li>
              <DropdownButton onClick={(e) => toggleSubMenu("about", e)} isOpen={isSubMenuOpen["about"]}>About</DropdownButton>
              {isSubMenuOpen["about"] && (
                <div className="pl-4 space-y-2">
                  <NavLink to="/about">About Us</NavLink>
                  <NavLink to="/GoverningBody">Governing Body</NavLink>
                  <NavLink to="/TeamMembers">Our Team</NavLink>
                </div>
              )}
            </li>
            <li>
              <DropdownButton onClick={(e) => toggleSubMenu("production", e)} isOpen={isSubMenuOpen["production"]}>Initiatives</DropdownButton>
              {isSubMenuOpen["production"] && (
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
              <DropdownButton onClick={(e) => toggleSubMenu("resources", e)} isOpen={isSubMenuOpen["resources"]}>Resources</DropdownButton>
              {isSubMenuOpen["resources"] && (
                <div className="pl-4 space-y-2">
                  <NavLink to="/membership">Membership Verification</NavLink>
                  <NavLink to="/careers">Career</NavLink>
                  <NavLink to="/tenders">Tenders</NavLink>
                </div>
              )}
            </li>
            <li><NavLink to="/ContactUs">Contact Us</NavLink></li>
            <li>
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg">
                    <img
                      src={currentUser.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.email}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-600"
                      alt="User avatar"
                    />
                    <div>
                      <p className="text-white font-semibold">{currentUser.user_metadata?.full_name || 'User'}</p>
                      <p className="text-gray-400 text-sm">{currentUser.email}</p>
                    </div>
                  </div>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <NavLink to="/profile">Profile</NavLink>
                  <NavLink to="/settings">Settings</NavLink>
                  <button 
                    onClick={handleLogout} 
                    disabled={isLoading}
                    className="flex items-center gap-2 w-full text-left py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-300 disabled:opacity-50"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    {isLoading ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  disabled={isLoading}
                  className="flex items-center gap-2 py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-300 font-medium disabled:opacity-50"
                >
                  <FaUser className="w-4 h-4" />
                  {isLoading ? 'Loading...' : 'Sign In'}
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
          onSuccess={handleLoginSuccess}
        />
      )}
    </header>
  );
};

export default Navbar;