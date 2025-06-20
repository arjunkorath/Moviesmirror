import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  mediaId: number;
  mediaType: 'movie' | 'tv';
  title: string;
  posterPath: string | null;
  imdbId?: string;
  tmdbId: number;
  seasonNumber?: number;
  episodeNumber?: number;
}

const VideoPlayer = ({ 
  mediaId, 
  mediaType, 
  title, 
  posterPath,
  imdbId,
  tmdbId,
  seasonNumber, 
  episodeNumber,
}: VideoPlayerProps) => {
  
  // Construct the embed URL
  const getEmbedUrl = () => {
    const baseUrl = 'https://vidsrc.to/embed';
    
    if (mediaType === 'movie') {
      return `${baseUrl}/movie/${tmdbId}`;
    } else {
      if (seasonNumber !== undefined && episodeNumber !== undefined) {
        return `${baseUrl}/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;
      }
      return `${baseUrl}/tv/${tmdbId}`;
    }
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow-xl">
      <div className="aspect-video relative">
        <iframe
          src={getEmbedUrl()}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen"
          referrerPolicy="origin"
          title={title}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
