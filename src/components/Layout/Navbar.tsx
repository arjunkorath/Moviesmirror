import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  LogOut, 
  LogIn, 
  Menu, 
  X
} from 'lucide-react';
import { useAuth } from '../../hooks/UseAuth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? 'glass-navbar py-3 shadow-2xl' 
          : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-6'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container-custom flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="flex items-center">
            <div className="relative z-10">
              <img 
                src="https://raw.githubusercontent.com/ARAssociates23/Moviesmirror-logo/main/MoviesMirror%20Logo.png" 
                alt="MoviesMirror Logo" 
                className="w-8 h-8" 
              />
            </div>
            <span className="ml-3 text-2xl font-bold text-white sf-pro-display z-10">MoviesMirror</span>
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          <motion.form 
            onSubmit={handleSearch} 
            className="relative"
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
          >
            <input
              type="text"
              placeholder="Search movies, shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="liquid-glass text-sm px-6 py-3 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64 transition-all duration-500 focus:w-80 sf-pro-text placeholder-white/60"
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-4 text-white/70 hover:text-white transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </button>
          </motion.form>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <button 
                  onClick={handleProfileClick}
                  className="p-2 rounded-xl liquid-glass apple-hover text-white/80 hover:text-white transition-colors"
                  title="Profile"
                >
                  <User className="w-5 h-5" />
                </button>
              </motion.div>
              <motion.button 
                onClick={() => logout()} 
                className="p-2 rounded-xl liquid-glass apple-hover text-white/80 hover:text-red-400 transition-colors"
                title="Logout"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="btn-primary flex items-center">
                <LogIn className="w-4 h-4 mr-2" />
                <span className="sf-pro-text font-semibold">Sign In</span>
              </Link>
            </motion.div>
          )}
        </div>

        <motion.button 
          className="md:hidden p-2 rounded-xl liquid-glass text-white/80 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden liquid-glass-strong mt-4 mx-6 rounded-2xl overflow-hidden"
          >
            <div className="p-6 space-y-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search movies, shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full liquid-glass text-sm px-6 py-4 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 sf-pro-text placeholder-white/60"
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 h-full px-4 text-white/70 hover:text-white transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
              
              <div className="pt-4 border-t border-white/10">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={handleProfileClick}
                      className="flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors sf-pro-text"
                    >
                      <User className="w-5 h-5 mr-3" />
                      <span>Profile</span>
                    </button>
                    <button 
                      onClick={() => logout()} 
                      className="flex items-center text-sm font-medium text-red-400 hover:text-red-300 transition-colors sf-pro-text"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    <span className="sf-pro-text font-semibold">Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
