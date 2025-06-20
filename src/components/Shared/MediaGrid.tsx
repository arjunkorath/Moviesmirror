import { motion } from 'framer-motion';
import MediaCard from './MediaCard';
import { MediaItem } from '../../types';

interface MediaGridProps {
  title?: string;
  items: MediaItem[];
  isLoading?: boolean;
  emptyMessage?: string;
  showRanking?: boolean;
}

const MediaGrid = ({ 
  title, 
  items, 
  isLoading = false, 
  emptyMessage = 'No items found.',
  showRanking = false 
}: MediaGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="mb-16">
        {title && (
          <motion.h2 
            className="text-3xl font-bold mb-8 sf-pro-display text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="media-card">
              <div className="w-full h-full skeleton"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show empty state
  if (items.length === 0) {
    return (
      <div className="mb-16">
        {title && (
          <motion.h2 
            className="text-3xl font-bold mb-8 sf-pro-display text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
        )}
        <motion.div 
          className="flex flex-col items-center justify-center py-16 liquid-glass-card rounded-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/60 sf-pro-text">{emptyMessage}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      {title && (
        <motion.h2 
          className="text-3xl font-bold mb-8 sf-pro-display text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
      )}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {items.map((item, index) => (
          <MediaCard 
            key={`${item.id}-${item.media_type || 'item'}`} 
            item={item} 
            priority={index < 6}
            showRanking={showRanking}
            ranking={showRanking ? index + 1 : undefined}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MediaGrid;
