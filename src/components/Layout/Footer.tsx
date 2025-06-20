import { Link } from 'react-router-dom';
import { Film, Github, Mail, Twitter, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="liquid-glass-card mt-20 py-16 border-t border-white/10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center mb-6">
              <div className="relative z-10">
                <img 
                  src="https://raw.githubusercontent.com/ARAssociates23/Moviesmirror-logo/main/MoviesMirror%20Logo.png" 
                  alt="MoviesMirror Logo" 
                  className="w-8 h-8" 
                />
              </div>
              <span className="ml-3 text-2xl font-bold text-white sf-pro-display z-10">MoviesMirror</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-8 sf-pro-text max-w-md">
              MoviesMirror is your gateway to endless entertainment. Stream the latest movies and TV shows in stunning quality. Experience cinema like never before with our liquid glass interface.
            </p>
            <div className="flex space-x-4">
              {[
                
                { icon: Github, href: "https://github.com/ARAssociates23/Moviesmirror.git", label: "Github" },
                
              ].map(({ icon: Icon, href, label }) => (
                <motion.a 
                  key={label}
                  href={href} 
                  className="liquid-glass p-3 rounded-xl text-white/70 hover:text-white transition-all duration-300 apple-hover"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6 sf-pro-display text-white">Navigate</h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/search", label: "Search" },
                { to: "/movies", label: "Movies" },
                { to: "/tv-shows", label: "TV Shows" }
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300 sf-pro-text apple-hover"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6 sf-pro-display text-white">Legal</h3>
            <ul className="space-y-3">
              {[
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
                { to: "/dmca", label: "DMCA" },
                { to: "/contact", label: "Contact Us" }
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300 sf-pro-text apple-hover"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xs text-white/50 mb-3 sf-pro-text">
            © {new Date().getFullYear()} MoviesMirror. This is a demo application. Not for commercial use. All media content is sourced through public APIs.
          </p>
          <p className="text-xs text-white/50 mb-4 sf-pro-text">
            Data provided by{' '}
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300 transition-colors apple-hover"
            >
              The Movie Database (TMDB)
            </a>
          </p>
          <motion.div 
            className="flex items-center justify-center text-white/40"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs sf-pro-text mr-2">Made with</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400 mx-1" />
            <span className="text-xs sf-pro-text ml-2">for movie lovers</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
