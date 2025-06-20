import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { getTVShowDetails, getTVShowSeasonDetails } from '../api/tmdbApi';
import MediaDetails from '../components/Media/Mediadetails';
import SeasonEpisodeSelector from '../components/Media/SeasonEpisodeSelector';
import VideoPlayer from '../components/Media/VideoPlayer';
import MediaGrid from '../components/Shared/MediaGrid';
import LoadingScreen from '../components/Shared/LoadingScreen';

const TVShowPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const initialSeason = parseInt(searchParams.get('season') || '1');
  const initialEpisode = parseInt(searchParams.get('episode') || '1');
  
  const [isWatching, setIsWatching] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(initialSeason);
  const [selectedEpisode, setSelectedEpisode] = useState(initialEpisode);
  
  const { data: tvShow, isLoading: isTVShowLoading, isError: isTVShowError } = useQuery(
    ['tvShow', id],
    () => id ? getTVShowDetails(id) : Promise.reject('No ID provided'),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!id,
    }
  );
  
  const { data: seasonDetails, isLoading: isSeasonLoading } = useQuery(
    ['season', id, selectedSeason],
    () => id ? getTVShowSeasonDetails(id, selectedSeason) : Promise.reject('No ID or season provided'),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!id && !!tvShow,
    }
  );
  
  useEffect(() => {
    if (id) {
      const params = new URLSearchParams();
      params.set('season', selectedSeason.toString());
      params.set('episode', selectedEpisode.toString());
      navigate(`/tv/${id}?${params.toString()}`, { replace: true });
    }
  }, [id, selectedSeason, selectedEpisode, navigate]);
  
  useEffect(() => {
    setSelectedSeason(initialSeason);
    setSelectedEpisode(initialEpisode);
  }, [initialSeason, initialEpisode]);
  
  if (isTVShowLoading) {
    return <LoadingScreen />;
  }
  
  if (isTVShowError || !tvShow) {
    return (
      <div className="container-custom py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading TV Show</h2>
          <p className="text-text-secondary mb-6">Sorry, we couldn't load the TV show details. Please try again later.</p>
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
  
  const seasonsWithEpisodes = tvShow.seasons.map(season => {
    if (season.season_number === selectedSeason && seasonDetails) {
      return {
        ...season,
        episodes: seasonDetails.episodes,
      };
    }
    return season;
  });
  
  const handlePlay = () => {
    setIsWatching(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleEpisodeSelect = (seasonNumber: number, episodeNumber: number) => {
    setSelectedSeason(seasonNumber);
    setSelectedEpisode(episodeNumber);
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
            mediaId={tvShow.id}
            mediaType="tv"
            title={tvShow.name}
            posterPath={tvShow.poster_path}
            tmdbId={tvShow.id}
            seasonNumber={selectedSeason}
            episodeNumber={selectedEpisode}
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
          media={tvShow} 
          mediaType="tv" 
          onPlay={handlePlay} 
        />
      )}
      
      <div className="container-custom mt-8">
        <SeasonEpisodeSelector 
          seasons={seasonsWithEpisodes} 
          initialSeason={selectedSeason}
          initialEpisode={selectedEpisode}
          onSelect={handleEpisodeSelect}
        />
      </div>
      
      {tvShow.similar?.results && tvShow.similar.results.length > 0 && (
        <div className="container-custom">
          <MediaGrid 
            title="Similar TV Shows" 
            items={tvShow.similar.results.map(item => ({ ...item, media_type: 'tv' }))} 
          />
        </div>
      )}
      
      {tvShow.recommendations?.results && tvShow.recommendations.results.length > 0 && (
        <div className="container-custom">
          <MediaGrid 
            title="Recommended TV Shows" 
            items={tvShow.recommendations.results.map(item => ({ ...item, media_type: item.media_type || 'tv' }))} 
          />
        </div>
      )}
    </div>
  );
};

export default TVShowPage;
