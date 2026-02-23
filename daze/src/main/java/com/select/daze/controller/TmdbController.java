package com.select.daze.controller;

import com.select.daze.dto.MovieDTO;
import com.select.daze.dto.MovieRecommendationDTO;
import com.select.daze.dto.GenreDTO;
import com.select.daze.service.TmdbService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class TmdbController {

    @Autowired
    private TmdbService tmdbService;

    // ✅ 1. Popular Movies with filters
    @GetMapping("/popular")
    public ResponseEntity<List<MovieDTO>> getPopularMovies(
            @RequestParam(defaultValue = "release_date") String sortBy,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String language
    ) {
        List<MovieDTO> popular = tmdbService.getPopularMovieDTOs(sortBy, genre, language);
        if (popular.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(popular);
    }

    // ✅ 2. Top Rated Movies with filters
    @GetMapping("/top-rated")
    public ResponseEntity<List<MovieDTO>> getTopRatedMovies(
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String language
    ) {
        List<MovieDTO> topRated = tmdbService.getTopRatedMovieDTOs(genre, language);
        if (topRated.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(topRated);
    }

    // ✅ 3. Search Movies
    @GetMapping("/search")
    public ResponseEntity<List<MovieDTO>> searchMovies(@RequestParam String query) {
        List<MovieDTO> results = tmdbService.searchMovies(query);
        if (results.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(results);
    }

    // ✅ 4. Get Recommended Movies
    @GetMapping("/recommendations")
    public ResponseEntity<List<MovieRecommendationDTO>> getRecommendedMovies(
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String language
    ) {
        List<MovieRecommendationDTO> recommended = tmdbService.getRecommendedMovies(genre, language);
        if (recommended.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(recommended);
    }

    // ✅ 5. Get All Genres
    @GetMapping("/genres")
    public ResponseEntity<List<GenreDTO>> getGenres() {
        List<GenreDTO> genres = tmdbService.getAllGenres();
        if (genres.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(genres);
    }
}
