package com.select.daze.dto;

import java.util.List;

public class MovieRecommendationDTO {
    private String title;
    private String overview;
    private String posterPath;
    private String releaseDate;
    private String language;
    private List<String> genres;

    public MovieRecommendationDTO() {
    }

    public MovieRecommendationDTO(String title, String overview, String posterPath,
                                   String releaseDate, String language, List<String> genres) {
        this.title = title;
        this.overview = overview;
        this.posterPath = posterPath;
        this.releaseDate = releaseDate;
        this.language = language;
        this.genres = genres;
    }

    // Getters and Setters
    
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }
}
