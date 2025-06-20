import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Clock, Calendar } from 'lucide-react';
import { Season, Episode } from '../../types';

interface SeasonEpisodeSelectorProps {
  seasons: Season[];
  initialSeason?: number;
  initialEpisode?: number;
  onSelect: (seasonNumber: number, episodeNumber: number) => void;
}

const SeasonEpisodeSelector = ({ 
  seasons, 
  initialSeason = 1, 
  initialEpisode = 1, 
  onSelect 
}: SeasonEpisodeSelectorProps) => {
  const [selectedSeason, setSelectedSeason] = useState(initialSeason);
  const [selectedEpisode, setSelectedEpisode] = useState(initialEpisode);
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);

  // Find the selected season when it changes
  useEffect(() => {
    const season = seasons.find(s => s.season_number === selectedSeason) || null;
    setCurrentSeason(season);
  }, [selectedSeason, seasons]);

  // Handle initial values
  useEffect(() => {
    if (initialSeason) {
      setSelectedSeason(initialSeason);
    }
    if (initialEpisode) {
      setSelectedEpisode(initialEpisode);
    }
  }, [initialSeason, initialEpisode]);

  // Handle season selection
  const handleSeasonSelect = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber);
    setSelectedEpisode(1); // Reset to first episode when changing season
    setIsSeasonDropdownOpen(false);
    onSelect(seasonNumber, 1);
  };

  // Handle episode selection
  const handleEpisodeSelect = (episodeNumber: number) => {
    setSelectedEpisode(episodeNumber);
    onSelect(selectedSeason, episodeNumber);
  };

  return (
    <motion.div 
      className="liquid-glass-card rounded-3xl p-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <motion.h3 
          className="text-2xl font-bold mb-4 md:mb-0 sf-pro-display text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Episodes
        </motion.h3>
        
        {/* Season Selector Dropdown */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
            className="flex items-center justify-between liquid-glass-strong rounded-2xl px-6 py-3 min-w-[180px] transition-all duration-300 apple-hover"
          >
            <span className="text-white font-semibold sf-pro-text">Season {selectedSeason}</span>
            <ChevronDown className={`w-5 h-5 ml-3 text-white/70 transition-transform duration-300 ${isSeasonDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isSeasonDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute right-0 mt-2 w-full liquid-glass-strong rounded-2xl shadow-2xl z-10 max-h-60 overflow-y-auto"
              >
                <ul className="py-2">
                  {seasons.map(season => (
                    <li key={season.id}>
                      <button
                        onClick={() => handleSeasonSelect(season.season_number)}
                        className={`w-full text-left px-6 py-3 transition-all duration-200 sf-pro-text ${
                          selectedSeason === season.season_number 
                            ? 'bg-blue-500/20 text-blue-400 font-semibold' 
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        Season {season.season_number}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Episodes List */}
      <div className="space-y-4">
        {currentSeason?.episodes ? (
          currentSeason.episodes.map((episode, index) => (
            <EpisodeItem
              key={episode.id}
              episode={episode}
              isSelected={selectedEpisode === episode.episode_number}
              onSelect={handleEpisodeSelect}
              index={index}
            />
          ))
        ) : (
          <motion.div 
            className="text-center py-16 liquid-glass rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/60 sf-pro-text">No episodes found for this season.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

interface EpisodeItemProps {
  episode: Episode;
  isSelected: boolean;
  onSelect: (episodeNumber: number) => void;
  index: number;
}

const EpisodeItem = ({ episode, isSelected, onSelect, index }: EpisodeItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      className={`flex flex-col sm:flex-row gap-4 p-4 rounded-2xl transition-all duration-300 ${
        isSelected 
          ? 'liquid-glass-strong border border-blue-500/30 shadow-lg' 
          : 'liquid-glass hover:liquid-glass-strong'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Episode Image */}
      <div className="relative sm:w-48 aspect-video rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={episode.still_path ? `https://image.tmdb.org/t/p/w300${episode.still_path}` : 'https://via.placeholder.com/300x170/1a1a1a/ffffff?text=No+Image'}
          alt={episode.name}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
          <div className="absolute bottom-3 left-3 text-white">
            <span className="text-sm font-bold sf-pro-text bg-black/50 px-2 py-1 rounded-lg">
              Ep {episode.episode_number}
            </span>
          </div>
        </div>
        
        {/* Play Button Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelect(episode.episode_number)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="liquid-glass-strong rounded-full p-3 apple-hover">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      {/* Episode Info */}
      <div className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-bold text-lg text-white sf-pro-display line-clamp-1">
            {episode.name}
          </h4>
          <div className="flex items-center text-white/60 text-sm ml-4">
            <Clock className="w-4 h-4 mr-1" />
            <span className="sf-pro-text">{episode.runtime ? `${episode.runtime}m` : 'N/A'}</span>
          </div>
        </div>
        
        <p className="text-white/70 text-sm mb-4 line-clamp-2 sm:line-clamp-3 sf-pro-text leading-relaxed">
          {episode.overview || 'No description available.'}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-white/50 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="sf-pro-text">
              {episode.air_date ? new Date(episode.air_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              }) : 'No air date'}
            </span>
          </div>
          
          <motion.button
            onClick={() => onSelect(episode.episode_number)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 sf-pro-text ${
              isSelected 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'liquid-glass-strong text-white/80 hover:text-white apple-hover'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSelected ? 'Currently Selected' : 'Watch Episode'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SeasonEpisodeSelector;
