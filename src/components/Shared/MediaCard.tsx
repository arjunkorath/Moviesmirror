import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, Calendar } from 'lucide-react';
import { MediaItem } from '../../types';
import { getImagePath } from '../../api/tmdbApi';

interface MediaCardProps {
  item: MediaItem;
  priority?: boolean;
}

const MediaCard = ({ item, priority = false }: MediaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const title = item.title || item.name || 'Unknown';
  const date = item.release_date || item.first_air_date;
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
  const link = `/${mediaType}/${item.id}`;
  
  const posterPath = getImagePath(item.poster_path);
  const backdropPath = getImagePath(item.backdrop_path, 'w780');
  const fallbackImage = 'https://via.placeholder.com/300x450/1C1C1E/ffffff?text=No+Image';

  return (
    <motion.div 
      className="group hover-scale"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={link} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl glass-effect">
          <img 
            src={posterPath || fallbackImage} 
            alt={title}
            className="w-full h-full object-cover transition-all duration-500"
            loading={priority ? "eager" : "lazy"}
          />
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-70'
          }`}>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400" />
                  <span className="text-xs font-medium">{item.vote_average?.toFixed(1)}</span>
                </div>
                {date && (
                  <div className="flex items-center text-text-secondary">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="text-xs">{new Date(date).getFullYear()}</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-sm font-medium text-white line-clamp-1">{title}</h3>
              
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3"
                >
                  <p className="text-xs text-text-secondary line-clamp-2">{item.overview || 'No description available.'}</p>
                  <button className="mt-3 w-full btn-primary flex items-center justify-center py-1.5">
                    <Play className="w-3 h-3 mr-1" />
                    <span className="text-xs">{mediaType === 'movie' ? 'Watch Movie' : 'Watch Show'}</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="absolute top-2 left-2 glass-effect text-white text-xs px-2 py-1 rounded-lg">
            {mediaType === 'movie' ? 'Movie' : 'TV'}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MediaCard;
