import { useEffect, useMemo, useState } from "react";
import {
  fetchGenres,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchRecommendations,
  searchMovies,
} from "../api/movies.js";
import { MovieCard } from "../components/MovieCard.jsx";

const LANG_OPTIONS = [
  { value: "", label: "Any language" },
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
];

const SORT_OPTIONS = [
  { value: "release_date", label: "Newest releases" },
  { value: "title", label: "Title A–Z" },
  { value: "popularity", label: "Trending now" },
];

export function DashboardPage({ user }) {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [sortBy, setSortBy] = useState("release_date");
  const [activeTab, setActiveTab] = useState("popular");

  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [g, pop, top, rec] = await Promise.all([
          fetchGenres(),
          fetchPopularMovies({ sortBy, genre: selectedGenre, language }),
          fetchTopRatedMovies({ genre: selectedGenre, language }),
          fetchRecommendations({ genre: selectedGenre, language }),
        ]);
        if (cancelled) return;
        setGenres(g);
        setPopular(pop);
        setTopRated(top);
        setRecommended(rec);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load movies. Check that the Spring Boot server is running.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [language, selectedGenre, sortBy]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const results = await searchMovies(searchQuery.trim());
      setSearchResults(results);
      setActiveTab("search");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Search failed. Please try again in a moment.",
      );
    } finally {
      setLoading(false);
    }
  };

  const genreOptions = useMemo(
    () => [{ id: "", name: "Any genre" }, ...genres],
    [genres],
  );

  const currentList = useMemo(() => {
    if (activeTab === "popular") return popular;
    if (activeTab === "top-rated") return topRated;
    if (activeTab === "recommended") return recommended;
    if (activeTab === "search") return searchResults;
    return [];
  }, [activeTab, popular, topRated, recommended, searchResults]);

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>
            {user ? `${user.name}'s dashboard` : "Daze movie dashboard"}
          </h1>
          <p className="muted">
            Explore <strong>/api/movies</strong> via filters, tabs and search –
            all powered directly by your Spring Boot controllers.
          </p>
        </div>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search movies by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn ghost">
            Search
          </button>
        </form>
      </header>

      <section className="filters glass">
        <div className="filter-group">
          <label>
            Genre
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genreOptions.map((g) => (
                <option key={g.id || "any"} value={g.name || ""}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Language
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANG_OPTIONS.map((l) => (
                <option key={l.value || "any"} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sort popular by
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="tab-row">
          <button
            type="button"
            className={`tab ${activeTab === "popular" ? "active" : ""}`}
            onClick={() => setActiveTab("popular")}
          >
            Popular
            <span className="tab-count">{popular.length}</span>
          </button>
          <button
            type="button"
            className={`tab ${activeTab === "top-rated" ? "active" : ""}`}
            onClick={() => setActiveTab("top-rated")}
          >
            Top rated
            <span className="tab-count">{topRated.length}</span>
          </button>
          <button
            type="button"
            className={`tab ${activeTab === "recommended" ? "active" : ""}`}
            onClick={() => setActiveTab("recommended")}
          >
            Recommended
            <span className="tab-count">{recommended.length}</span>
          </button>
          <button
            type="button"
            className={`tab ${activeTab === "search" ? "active" : ""}`}
            onClick={() => setActiveTab("search")}
          >
            Search
            <span className="tab-count">{searchResults.length}</span>
          </button>
        </div>
      </section>

      {error && <p className="pill error">{error}</p>}
      {loading && <p className="pill info">Loading movies…</p>}

      <section className="grid">
        {currentList.map((movie) => (
          <MovieCard key={`${movie.title}-${movie.releaseDate}`} movie={movie} />
        ))}
        {!loading && !currentList.length && (
          <p className="muted">
            No movies found for this combination. Try adjusting filters or
            switching tabs.
          </p>
        )}
      </section>
    </section>
  );
}

