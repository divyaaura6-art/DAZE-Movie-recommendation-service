document.addEventListener("DOMContentLoaded", () => {
    loadPopular();
});

function createCard(movie) {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.posterPath}" />
        <h3>${movie.title}</h3>
    `;

    card.onclick = () => showDetails(movie);

    return card;
}

function loadPopular() {
    fetch("/api/movies/popular")
        .then(res => res.json())
        .then(data => renderMovies(data));
}

function loadTopRated() {
    fetch("/api/movies/top-rated")
        .then(res => res.json())
        .then(data => renderMovies(data));
}

function loadRecommended() {
    fetch("/api/movies/recommendations")
        .then(res => res.json())
        .then(data => renderMovies(data));
}

function renderMovies(movies) {
    const container = document.getElementById("movieList");
    container.innerHTML = "";

    movies.forEach(movie => {
        container.appendChild(createCard(movie));
    });
}

function showDetails(movie) {
    const modal = document.getElementById("movieModal");
    const details = document.getElementById("movieDetails");

    details.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w500${movie.posterPath}" width="200"/>
        <p><strong>Rating:</strong> ${movie.rating}</p>
        <p><strong>Overview:</strong> ${movie.overview}</p>
        <p><strong>Release Date:</strong> ${movie.releaseDate}</p>
    `;

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("movieModal").style.display = "none";
}