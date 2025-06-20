import axios from 'axios';
import { MediaType, Movie, TVShow, SearchResults } from '../types';

const API_KEY = 'e9ca401cd0e7087e6ac5e51c15541ab1';
const BASE_URL = 'https://api.themoviedb.org/3';

// Create axios instance with base config
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const getImagePath = (path: string | null, size: string = 'w500') => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Trending movies and TV shows
export const getTrending = async (mediaType: MediaType = 'all', timeWindow: 'day' | 'week' = 'week') => {
  const response = await api.get(`/trending/${mediaType}/${timeWindow}`);
  return response.data.results;
};

// Popular movies
export const getPopularMovies = async (page: number = 1) => {
  const response = await api.get('/movie/popular', { params: { page } });
  return response.data;
};

// Top rated movies
export const getTopRatedMovies = async (page: number = 1) => {
  const response = await api.get('/movie/top_rated', { params: { page } });
  return response.data;
};

// Latest movies
export const getLatestMovies = async (page: number = 1) => {
  const response = await api.get('/movie/now_playing', { params: { page } });
  return response.data;
};

// Popular TV shows
export const getPopularTVShows = async (page: number = 1) => {
  const response = await api.get('/tv/popular', { params: { page } });
  return response.data;
};

// Top rated TV shows
export const getTopRatedTVShows = async (page: number = 1) => {
  const response = await api.get('/tv/top_rated', { params: { page } });
  return response.data;
};

// Latest TV shows
export const getLatestTVShows = async (page: number = 1) => {
  const response = await api.get('/tv/on_the_air', { params: { page } });
  return response.data;
};

// Get movie details
export const getMovieDetails = async (id: string): Promise<Movie> => {
  const response = await api.get(`/movie/${id}`, {
    params: {
      append_to_response: 'videos,credits,similar,recommendations',
    },
  });
  return response.data;
};

// Get TV show details
export const getTVShowDetails = async (id: string): Promise<TVShow> => {
  const response = await api.get(`/tv/${id}`, {
    params: {
      append_to_response: 'videos,credits,similar,recommendations,seasons,episodes',
    },
  });
  return response.data;
};

// Get TV show season details
export const getTVShowSeasonDetails = async (id: string, seasonNumber: number) => {
  const response = await api.get(`/tv/${id}/season/${seasonNumber}`);
  return response.data;
};

// Search for movies and TV shows
export const searchMedia = async (query: string, page: number = 1): Promise<SearchResults> => {
  const response = await api.get('/search/multi', {
    params: {
      query,
      page,
      include_adult: false,
    },
  });
  return response.data;
};

export default {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getLatestMovies,
  getPopularTVShows,
  getTopRatedTVShows,
  getLatestTVShows,
  getMovieDetails,
  getTVShowDetails,
  getTVShowSeasonDetails,
  searchMedia,
  getImagePath,
};
