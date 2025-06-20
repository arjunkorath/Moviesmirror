import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, ChevronLeft, ChevronRight, Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MediaItem } from '../../types';
import { getImagePath } from '../../api/tmdbApi';

interface HeroCarouselProps {
  items: MediaItem[];
}

const HeroCarousel = ({ items }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying || items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Manual navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];
  const backdropPath = getImagePath(currentItem.backdrop_path, 'original');
  const title = currentItem.title || currentItem.name;
  const mediaType = currentItem.media_type || (currentItem.title ? 'movie' : 'tv');
  const releaseDate = currentItem.release_date || currentItem.first_air_date;

  return (
    <div 
      className="relative h-screen overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {backdropPath ? (
            <div className="relative w-full h-full">
              <img
                src={backdropPath}
                alt={title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30"></div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl float-animation"></div>
      <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl float-animation" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="container-custom relative h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            className="max-w-3xl z-10 pb-32 md:pb-16"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Category Badge */}
            <motion.div 
              className="inline-flex items-center liquid-glass px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-sm font-semibold text-white sf-pro-text">Latest Release</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-7xl font-black mb-6 sf-pro-display text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {title}
            </motion.h1>
            
            {/* Rating and Year */}
            <motion.div 
              className="flex flex-wrap items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center liquid-glass px-3 py-2 rounded-xl">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-2" />
                <span className="text-white font-semibold sf-pro-text">{currentItem.vote_average?.toFixed(1)}</span>
              </div>
              {releaseDate && (
                <div className="liquid-glass px-3 py-2 rounded-xl">
                  <span className="text-white font-semibold sf-pro-text">
                    {new Date(releaseDate).getFullYear()}
                  </span>
                </div>
              )}
              <div className="liquid-glass px-3 py-2 rounded-xl">
                <span className="text-white font-semibold sf-pro-text">
                  {mediaType === 'movie' ? 'Movie' : 'TV Show'}
                </span>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-white/90 text-lg mb-8 line-clamp-3 sf-pro-text leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {currentItem.overview}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Link
                to={`/${mediaType}/${currentItem.id}`}
                className="btn-primary flex items-center text-lg px-8 py-4 w-full sm:w-auto justify-center"
              >
                <Play className="w-5 h-5 mr-3 fill-white" />
                <span className="sf-pro-text font-semibold">Watch Now</span>
              </Link>
              <Link
                to={`/${mediaType}/${currentItem.id}`}
                className="btn-secondary flex items-center text-lg px-8 py-4 w-full sm:w-auto justify-center"
              >
                <Info className="w-5 h-5 mr-3" />
                <span className="sf-pro-text font-semibold">More Info</span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 liquid-glass-strong rounded-full p-3 apple-hover"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </motion.button>

      <motion.button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 liquid-glass-strong rounded-full p-3 apple-hover"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </motion.button>

      {/* Dots Indicator - Positioned above buttons on mobile */}
      <div className="absolute bottom-24 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: 5, 
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'restart'
          }}
          key={currentIndex}
        />
      </div>
    </div>
  );
};

export default HeroCarousel;
