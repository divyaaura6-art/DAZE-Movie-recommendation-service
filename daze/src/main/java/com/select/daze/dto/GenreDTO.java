package com.select.daze.dto;

public class GenreDTO {
    private int id;
    private String name;

    public GenreDTO() {}  // Default constructor for Jackson

    public GenreDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // ✅ Getters
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    // ✅ Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}
