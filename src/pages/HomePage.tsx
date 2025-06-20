import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import MediaGrid from '../components/Shared/MediaGrid';
import LoadingScreen from '../components/Shared/LoadingScreen';
import HeroCarousel from '../components/Home/HeroCarousel';
import { getTrending, getLatestMovies, getLatestTVShows, getPopularMovies, getTopRatedMovies, getTopRatedTVShows } from '../api/tmdbApi';

const HomePage = () => {
  // Fetch trending media for hero carousel
  const { data: trendingData, isLoading: isTrendingLoading } = useQuery(
    'trending', 
    () => getTrending('all', 'week')
  );
  
  // Fetch top rated movies
  const { data: topRatedMoviesData, isLoading: isTopRatedMoviesLoading } = useQuery(
    'topRatedMovies', 
    () => getTopRatedMovies()
  );
  
  // Fetch top rated TV shows
  const { data: topRatedTVShowsData, isLoading: isTopRatedTVShowsLoading } = useQuery(
    'topRatedTVShows', 
    () => getTopRatedTVShows()
  );
  
  // Fetch latest movies
  const { data: latestMoviesData, isLoading: isLatestMoviesLoading } = useQuery(
    'latestMovies', 
    () => getLatestMovies()
  );
  
  // Fetch latest TV shows
  const { data: latestTVShowsData, isLoading: isLatestTVShowsLoading } = useQuery(
    'latestTVShows', 
    () => getLatestTVShows()
  );
  
  // Show loading screen if all data is loading
  if (isTrendingLoading && isLatestMoviesLoading && isLatestTVShowsLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      {trendingData && trendingData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-20"
        >
          <HeroCarousel items={trendingData.slice(0, 5)} />
        </motion.div>
      )}
      
      <div className="container-custom">
        {/* Trending Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MediaGrid 
            title="🔥 Trending This Week" 
            items={trendingData || []} 
            isLoading={isTrendingLoading} 
          />
        </motion.div>
        
        {/* Top 10 Movies */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MediaGrid 
            title="🎬 Top 10 Movies" 
            items={(topRatedMoviesData?.results || []).slice(0, 10).map(item => ({ ...item, media_type: 'movie' }))} 
            isLoading={isTopRatedMoviesLoading}
            showRanking={true}
          />
        </motion.div>
        
        {/* Top 10 TV Shows */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MediaGrid 
            title="📺 Top 10 TV Shows" 
            items={(topRatedTVShowsData?.results || []).slice(0, 10).map(item => ({ ...item, media_type: 'tv' }))} 
            isLoading={isTopRatedTVShowsLoading}
            showRanking={true}
          />
        </motion.div>
        
        {/* Latest Movies Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <MediaGrid 
            title="🆕 Latest Movies" 
            items={(latestMoviesData?.results || []).map(item => ({ ...item, media_type: 'movie' }))} 
            isLoading={isLatestMoviesLoading} 
          />
        </motion.div>
        
        {/* Latest TV Shows Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <MediaGrid 
            title="📺 Latest TV Shows" 
            items={(latestTVShowsData?.results || []).map(item => ({ ...item, media_type: 'tv' }))} 
            isLoading={isLatestTVShowsLoading} 
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
