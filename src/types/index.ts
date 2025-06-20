export type MediaType = 'movie' | 'tv' | 'all';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Credit {
  id: number;
  name: string;
  character?: string;
  job?: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type: MediaType;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
}

export interface Movie extends MediaItem {
  title: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  videos?: { results: Video[] };
  credits?: { cast: Credit[]; crew: Credit[] };
  similar?: { results: MediaItem[] };
  recommendations?: { results: MediaItem[] };
  imdb_id?: string;
  budget?: number;
  revenue?: number;
  status?: string;
  tagline?: string;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  air_date: string;
  runtime: number;
}

export interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
  overview: string;
  air_date: string;
  episodes?: Episode[];
}

export interface TVShow extends MediaItem {
  name: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: Season[];
  genres: Genre[];
  videos?: { results: Video[] };
  credits?: { cast: Credit[]; crew: Credit[] };
  similar?: { results: MediaItem[] };
  recommendations?: { results: MediaItem[] };
  created_by?: { id: number; name: string; profile_path: string | null }[];
  episode_run_time?: number[];
  status?: string;
  networks?: { id: number; name: string; logo_path: string | null }[];
}

export interface SearchResults {
  page: number;
  results: MediaItem[];
  total_pages: number;
  total_results: number;
}

export interface ContinueWatchingItem {
  id: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  progress: number; // 0 to 100
  lastWatched: number; // timestamp
  seasonNumber?: number;
  episodeNumber?: number;
  totalLength?: number; // in seconds
  currentTime?: number; // in seconds
}
