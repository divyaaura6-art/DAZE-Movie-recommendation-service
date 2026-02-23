package com.select.daze.service;

import com.select.daze.dto.GenreDTO;
import com.select.daze.dto.GenreResponse;
import com.select.daze.dto.MovieDTO;
import com.select.daze.dto.MovieRecommendationDTO;
import com.select.daze.model.Movie;
import com.select.daze.model.MovieResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TmdbService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.base.url}")
    private String baseUrl;

    private List<GenreDTO> cachedGenres = null;

    // ✅ Public method for /api/genres
    public List<GenreDTO> getAllGenres() {
        if (cachedGenres == null) {
            String url = baseUrl + "/genre/movie/list?api_key=" + apiKey;
            try {
                GenreResponse response = restTemplate.getForObject(url, GenreResponse.class);
                if (response != null && response.getGenres() != null) {
                    cachedGenres = response.getGenres();
                } else {
                    cachedGenres = Collections.emptyList();
                }
            } catch (Exception e) {
                System.out.println("Error fetching genres: " + e.getMessage());
                cachedGenres = Collections.emptyList();
            }
        }
        return cachedGenres;
    }

    private List<Movie> fetchMovies(String endpoint) {
        try {
            String url = baseUrl + endpoint + "?api_key=" + apiKey;
            MovieResponse response = restTemplate.getForObject(url, MovieResponse.class);
            return (response != null && response.getResults() != null)
                    ? response.getResults()
                    : Collections.emptyList();
        } catch (Exception e) {
            System.out.println("Error fetching movies from " + endpoint + ": " + e.getMessage());
            return Collections.emptyList();
        }
    }

    private List<MovieDTO> convertToDTOs(List<Movie> movies) {
        Map<Integer, String> genreMap = getAllGenres().stream()
                .collect(Collectors.toMap(GenreDTO::getId, GenreDTO::getName));

        return movies.stream().map(movie -> {
            List<String> genreNames = movie.getGenreIds().stream()
                    .map(genreMap::get)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            return new MovieDTO(
                    movie.getOriginalTitle(),
                    movie.getOverview(),
                    movie.getPosterPath(),
                    movie.getBackdropPath(),
                    movie.getReleaseDate(),
                    movie.getOriginalLanguage(),
                    genreNames
            );
        }).collect(Collectors.toList());
    }

    private List<MovieDTO> filterMovies(List<MovieDTO> dtos, String genre, String language) {
        if (genre != null && !genre.isEmpty()) {
            dtos = dtos.stream()
                    .filter(dto -> dto.getGenres().stream()
                            .anyMatch(g -> g.equalsIgnoreCase(genre)))
                    .collect(Collectors.toList());
        }

        if (language != null && !language.isEmpty()) {
            dtos = dtos.stream()
                    .filter(dto -> dto.getLanguage().equalsIgnoreCase(language))
                    .collect(Collectors.toList());
        }

        return dtos;
    }

    public List<MovieDTO> getPopularMovieDTOs(String sortBy, String genre, String language) {
        List<MovieDTO> dtos = convertToDTOs(fetchMovies("/movie/popular"));
        dtos = filterMovies(dtos, genre, language);

        if ("title".equalsIgnoreCase(sortBy)) {
            dtos.sort(Comparator.comparing(MovieDTO::getTitle, Comparator.nullsLast(String::compareToIgnoreCase)));
        } else {
            dtos.sort(Comparator.comparing(MovieDTO::getReleaseDate, Comparator.nullsLast(String::compareTo)).reversed());
        }

        return dtos;
    }

    public List<MovieDTO> getTopRatedMovieDTOs(String genre, String language) {
        List<MovieDTO> dtos = convertToDTOs(fetchMovies("/movie/top_rated"));
        return filterMovies(dtos, genre, language);
    }

    public List<MovieDTO> searchMovies(String query) {
        try {
            String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
            String url = baseUrl + "/search/movie?api_key=" + apiKey + "&query=" + encodedQuery;
            MovieResponse response = restTemplate.getForObject(url, MovieResponse.class);
            List<Movie> movies = (response != null && response.getResults() != null)
                    ? response.getResults()
                    : Collections.emptyList();

            return convertToDTOs(movies);
        } catch (Exception e) {
            System.out.println("Error in searchMovies: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    public List<MovieRecommendationDTO> getRecommendedMovies(String genre, String language) {
        List<MovieDTO> popular = getPopularMovieDTOs("release_date", genre, language);
        return popular.stream().map(m -> new MovieRecommendationDTO(
                m.getTitle(),
                m.getOverview(),
                m.getPosterPath(),
                m.getReleaseDate(),
                m.getLanguage(),
                m.getGenres()
        )).collect(Collectors.toList());
    }
}
