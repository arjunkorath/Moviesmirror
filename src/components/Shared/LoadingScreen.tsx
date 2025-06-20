import { Film } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col items-center"
      >
        {/* Logo with liquid glass effect */}
        <motion.div
          className="relative mb-8 z-10"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="liquid-glass-strong rounded-full p-6">
            <img 
              src="https://raw.githubusercontent.com/ARAssociates23/Moviesmirror-logo/main/MoviesMirror%20Logo.png" 
              alt="MoviesMirror Logo" 
              className="w-16 h-16" 
            />
          </div>
        </motion.div>
        
        {/* App Name */}
        <motion.h2
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl font-bold text-white sf-pro-display z-10"
        >
          MoviesMirror
        </motion.h2>
        
        {/* Loading Dots */}
        <motion.div 
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full liquid-glass"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D4FF 100%)'
              }}
            />
          ))}
        </motion.div>
        
        {/* Loading Text */}
        <motion.p
          className="mt-6 text-white/60 sf-pro-text z-10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading amazing content...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
