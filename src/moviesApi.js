import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWFmMGZhMGVlYTczOGNhNWQxYmQ2MjgyZGVmZDIxMSIsIm5iZiI6MTc0Mjc1NDY2MC44MTMsInN1YiI6IjY3ZTA1MzY0ZjZhMGZjYmQwMDRkYjYzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upg3rPcf44fLo9HzhAG_Yx53pMDyjC3yh1sY5hrKLlE';

const getHeaders = () => ({
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
});
  
export const fetchTrendingMovies = async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}trending/movie/day`, {
        params: {
          page,
          include_adult: false,
          language: "en-US",
        },
        ...getHeaders(),
      });
  
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
};
  
export const fetchMoviesByQuery = async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}search/movie`, {
        ...getHeaders(),
        params: { query },
      });
  
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
};
  
export const fetchMoviesById = async (movieId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${movieId}`,
        getHeaders()
      );
  
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
};
  
export const fetchMoviesCast = async (movieId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${movieId}/credits`,
        getHeaders()
      );
  
      return response.data.cast;
    } catch (error) {
      console.error("Error fetching movie cast:", error);
      throw error;
    }
};
  
export const fetchMoviesReviews = async (movieId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${movieId}/reviews`,
        getHeaders()
      );
  
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movie reviews:", error);
      throw error;
    }
};