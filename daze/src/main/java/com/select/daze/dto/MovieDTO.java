package com.select.daze.dto;

import java.util.List;

public class MovieDTO {
    private String title;
    private String overview;
    private String posterPath;
    private String backdropUrl;
    private String releaseDate;
    private String language;
    private List<String> genres; 

    // Constructor
    public MovieDTO(String title, String overview, String posterPath, String backdropUrl, String releaseDate, String language,List<String> genres){
        this.title = title;
        this.overview = overview;
        this.posterPath = posterPath;
        this.backdropUrl = backdropUrl;
        this.releaseDate = releaseDate;
        this.language = language;
        this.genres = genres;
    }

    // Getters (No setters needed for response-only)
    public String getTitle() {
        return title;
    }

    public String getOverview() {
        return overview;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public String getBackdropUrl() {
        return backdropUrl;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public String getLanguage() {
        return language;
    }
    public List<String> getGenres()
    {
        return genres;
    }
}
