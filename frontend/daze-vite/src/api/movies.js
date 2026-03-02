import { apiClient } from "./client.js";

export async function fetchHello() {
  const res = await apiClient.get("/hello");
  return res.data;
}

export async function fetchGenres() {
  const res = await apiClient.get("/api/movies/genres");
  return res.status === 204 ? [] : res.data;
}

export async function fetchPopularMovies({ sortBy, genre, language }) {
  const res = await apiClient.get("/api/movies/popular", {
    params: {
      sortBy,
      genre: genre || undefined,
      language: language || undefined,
    },
  });
  return res.status === 204 ? [] : res.data;
}

export async function fetchTopRatedMovies({ genre, language }) {
  const res = await apiClient.get("/api/movies/top-rated", {
    params: {
      genre: genre || undefined,
      language: language || undefined,
    },
  });
  return res.status === 204 ? [] : res.data;
}

export async function searchMovies(query) {
  const res = await apiClient.get("/api/movies/search", {
    params: { query },
  });
  return res.status === 204 ? [] : res.data;
}

export async function fetchRecommendations({ genre, language }) {
  const res = await apiClient.get("/api/movies/recommendations", {
    params: {
      genre: genre || undefined,
      language: language || undefined,
    },
  });
  return res.status === 204 ? [] : res.data;
}

