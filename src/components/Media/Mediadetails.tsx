import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Star, 
  PlayCircle, 
  List, 
  BarChart,
  Info,
  Heart,
  Share,
  Plus
} from 'lucide-react';
import { Movie, TVShow, MediaType } from '../../types';
import { getImagePath } from '../../api/tmdbApi';

interface MediaDetailsProps {
  media: Movie | TVShow;
  mediaType: MediaType;
  onPlay: () => void;
}

const MediaDetails = ({ media, mediaType, onPlay }: MediaDetailsProps) => {
  const [showFullOverview, setShowFullOverview] = useState(false);
  
  // Common properties
  const title = mediaType === 'movie' ? (media as Movie).title : (media as TVShow).name;
  const backdropPath = getImagePath(media.backdrop_path, 'original');
  const posterPath = getImagePath(media.poster_path, 'w500');
  const releaseDate = mediaType === 'movie' 
    ? (media as Movie).release_date 
    : (media as TVShow).first_air_date;
  
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Format time (minutes to HH:MM format)
  const formatRuntime = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
  
  // Get movie runtime or average TV show episode runtime
  const runtime = mediaType === 'movie' 
    ? (media as Movie).runtime 
    : (media as TVShow).episode_run_time?.[0];

  return (
    <div className="relative min-h-screen">
      {/* Backdrop Image with Enhanced Gradient */}
      <div className="absolute inset-0 h-screen overflow-hidden">
        {backdropPath ? (
          <div className="w-full h-full relative">
            <motion.img
              src={backdropPath}
              alt={title}
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30"></div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        )}
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl float-animation"></div>
      <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl float-animation" style={{ animationDelay: '2s' }}></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Poster */}
          <motion.div 
            className="w-full lg:w-96 flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="liquid-glass-card rounded-3xl overflow-hidden shadow-2xl aspect-[2/3] apple-hover">
              <img
                src={posterPath || 'https://via.placeholder.com/500x750/121212/ffffff?text=No+Image'}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <motion.div 
              className="mt-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                onClick={onPlay}
                className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-lg font-semibold apple-hover"
              >
                <PlayCircle className="w-6 h-6" />
                <span className="sf-pro-text">{mediaType === 'movie' ? 'Watch Movie' : 'Watch Show'}</span>
              </button>
              
              <div className="flex gap-3">
                <button className="flex-1 liquid-glass-card rounded-2xl p-4 apple-hover flex items-center justify-center">
                  <Plus className="w-5 h-5 mr-2" />
                  <span className="sf-pro-text font-medium">Watchlist</span>
                </button>
                <button className="liquid-glass-card rounded-2xl p-4 apple-hover">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="liquid-glass-card rounded-2xl p-4 apple-hover">
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Details */}
          <motion.div 
            className="flex-grow max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Title and Year */}
            <motion.h1 
              className="text-4xl lg:text-6xl font-black tracking-tight mb-4 sf-pro-display text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {title}
              {releaseDate && (
                <span className="text-white/60 ml-4 text-3xl lg:text-4xl font-normal">
                  ({new Date(releaseDate).getFullYear()})
                </span>
              )}
            </motion.h1>
            
            {/* Tagline */}
            {media.tagline && (
              <motion.p 
                className="text-white/80 text-xl italic mb-8 sf-pro-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                "{media.tagline}"
              </motion.p>
            )}
            
            {/* Meta Information */}
            <motion.div 
              className="flex flex-wrap gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* Rating */}
              <div className="liquid-glass-card rounded-2xl px-4 py-3 flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-2" />
                <span className="text-white font-semibold sf-pro-text">{media.vote_average?.toFixed(1)}/10</span>
              </div>
              
              {/* Release Date */}
              {releaseDate && (
                <div className="liquid-glass-card rounded-2xl px-4 py-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-white/70" />
                  <span className="text-white sf-pro-text">{formatDate(releaseDate)}</span>
                </div>
              )}
              
              {/* Runtime */}
              {runtime && (
                <div className="liquid-glass-card rounded-2xl px-4 py-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-white/70" />
                  <span className="text-white sf-pro-text">{formatRuntime(runtime)}</span>
                </div>
              )}
              
              {/* Seasons count for TV */}
              {mediaType === 'tv' && (
                <div className="liquid-glass-card rounded-2xl px-4 py-3 flex items-center">
                  <List className="w-5 h-5 mr-2 text-white/70" />
                  <span className="text-white sf-pro-text">{(media as TVShow).number_of_seasons} Seasons</span>
                </div>
              )}
              
              {/* Episodes count for TV */}
              {mediaType === 'tv' && (
                <div className="liquid-glass-card rounded-2xl px-4 py-3 flex items-center">
                  <BarChart className="w-5 h-5 mr-2 text-white/70" />
                  <span className="text-white sf-pro-text">{(media as TVShow).number_of_episodes} Episodes</span>
                </div>
              )}
            </motion.div>
            
            {/* Genres */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex flex-wrap gap-3">
                {media.genres?.map(genre => (
                  <span 
                    key={genre.id} 
                    className="liquid-glass-card px-4 py-2 text-white/90 text-sm rounded-full sf-pro-text font-medium apple-hover"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </motion.div>
            
            {/* Overview */}
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <h3 className="text-2xl font-bold mb-4 sf-pro-display text-white">Overview</h3>
              <div className="liquid-glass-card rounded-3xl p-6">
                <p className="text-white/90 text-lg leading-relaxed sf-pro-text">
                  {showFullOverview 
                    ? media.overview 
                    : media.overview?.substring(0, 400)}
                  {!showFullOverview && media.overview && media.overview.length > 400 && '...'}
                </p>
                {media.overview && media.overview.length > 400 && (
                  <button 
                    onClick={() => setShowFullOverview(!showFullOverview)}
                    className="text-blue-400 hover:text-blue-300 mt-4 text-sm transition-colors sf-pro-text font-medium apple-hover"
                  >
                    {showFullOverview ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>
            </motion.div>
            
            {/* Cast */}
            {media.credits?.cast && media.credits.cast.length > 0 && (
              <motion.div 
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <h3 className="text-2xl font-bold mb-6 sf-pro-display text-white">Cast</h3>
                <div className="liquid-glass-card rounded-3xl p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {media.credits.cast.slice(0, 6).map(person => (
                      <div key={person.id} className="flex items-center space-x-4 liquid-glass rounded-2xl p-4 apple-hover">
                        {person.profile_path ? (
                          <img 
                            src={`https://image.tmdb.org/t/p/w92${person.profile_path}`} 
                            alt={person.name} 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center">
                            <span className="text-sm font-semibold sf-pro-text">{person.name.charAt(0)}</span>
                          </div>
                        )}
                        <div className="flex-grow min-w-0">
                          <p className="text-white font-semibold sf-pro-text truncate">{person.name}</p>
                          <p className="text-white/70 text-sm sf-pro-text truncate">{person.character}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;
