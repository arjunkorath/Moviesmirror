import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { getMovieDetails } from '../api/tmdbApi';
import MediaDetails from '../components/Media/Mediadetails';
import VideoPlayer from '../components/Media/VideoPlayer';
import MediaGrid from '../components/Shared/MediaGrid';
import LoadingScreen from '../components/Shared/LoadingScreen';

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isWatching, setIsWatching] = useState(false);
  
  // Get movie details
  const { data: movie, isLoading, isError } = useQuery(
    ['movie', id],
    () => id ? getMovieDetails(id) : Promise.reject('No ID provided'),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: !!id,
    }
  );
  
  // Handle errors
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (isError || !movie) {
    return (
      <div className="container-custom py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Movie</h2>
          <p className="text-text-secondary mb-6">Sorry, we couldn't load the movie details. Please try again later.</p>
          <button
            onClick={() => navigate(-1)}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  // Handle play button click
  const handlePlay = () => {
    setIsWatching(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div>
      {isWatching ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container-custom py-8"
        >
          <VideoPlayer 
            mediaId={movie.id}
            mediaType="movie"
            title={movie.title}
            posterPath={movie.poster_path}
            tmdbId={movie.id}
          />
          <button 
            onClick={() => setIsWatching(false)}
            className="mt-4 text-text-secondary hover:text-primary transition-colors"
          >
            Back to Details
          </button>
        </motion.div>
      ) : (
        <MediaDetails 
          media={movie} 
          mediaType="movie" 
          onPlay={handlePlay} 
        />
      )}
      
      {/* Similar Movies */}
      {movie.similar?.results && movie.similar.results.length > 0 && (
        <div className="container-custom mt-8">
          <MediaGrid 
            title="Similar Movies" 
            items={movie.similar.results.map(item => ({ ...item, media_type: 'movie' }))} 
          />
        </div>
      )}
      
      {/* Recommended Movies */}
      {movie.recommendations?.results && movie.recommendations.results.length > 0 && (
        <div className="container-custom">
          <MediaGrid 
            title="Recommended Movies" 
            items={movie.recommendations.results.map(item => ({ ...item, media_type: item.media_type || 'movie' }))} 
          />
        </div>
      )}
    </div>
  );
};

export default MoviePage;
