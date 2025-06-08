import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaUser } from "react-icons/fa";
import PropTypes from 'prop-types';
import acpLogo from '/src/assets/acp-logo-and-hero-img/acp-logo-fullName-white.png';
import { supabase } from '../services/supabaseClient';
import AuthModal from '../components/AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

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
    navigate("/");
    window.location.reload();
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false);
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
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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
      className={`block py-2 px-4 text-white hover:bg-red-800 hover:text-white rounded-md transition-all duration-300 ease-in-out ${
        isActiveLink(to) ? "bg-red-700 font-semibold" : "font-medium"
      }`}
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
      className={`flex items-center justify-between w-full py-2 px-4 text-white hover:bg-red-800 hover:text-white font-medium rounded-md transition-all duration-300 ease-in-out ${
        isOpen ? "bg-red-700" : ""
      }`}
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
        <ul className="hidden lg:flex items-center space-x-1">
          <li><NavLink to="/">Home</NavLink></li>
          <li className="relative group">
            <DropdownButton onClick={(e) => toggleSubMenu("about", e)} isOpen={isSubMenuOpen["about"]}>About</DropdownButton>
            {isSubMenuOpen["about"] && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-xl z-40 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/GoverningBody">Governing Body</NavLink>
                <NavLink to="/TeamMembers">Our Team</NavLink>
              </div>
            )}
          </li>
          <li className="relative group">
            <DropdownButton onClick={(e) => toggleSubMenu("production", e)} isOpen={isSubMenuOpen["production"]}>Initiatives</DropdownButton>
            {isSubMenuOpen["production"] && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-xl z-40 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
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
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-xl z-40 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
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
              <div className="relative group">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.email}`}
                  className="w-8 h-8 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
                  alt="User avatar"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-xl rounded-lg z-50 hidden group-hover:block transition-all duration-300 ease-in-out">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">Dashboard</Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg">Logout</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-300 ease-in-out font-medium"
              >
                <FaUser className="w-4 h-4" />
                Login
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
        <div className="lg:hidden bg-gray-900 px-4 pt-4 pb-6 shadow-xl">
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
                  <NavLink to="#">Membership Verification</NavLink>
                  <NavLink to="#">Career</NavLink>
                  <NavLink to="#">Tenders</NavLink>
                </div>
              )}
            </li>
            <li><NavLink to="/ContactUs">Contact Us</NavLink></li>
            <li>
              {currentUser ? (
                <div className="space-y-2">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <NavLink to="/settings">Settings</NavLink>
                  <NavLink to="/profile">Profile</NavLink>
                  <button 
                    onClick={handleLogout} 
                    className="block w-full text-left py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-300 font-medium"
                >
                  <FaUser className="w-4 h-4" />
                  Login
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