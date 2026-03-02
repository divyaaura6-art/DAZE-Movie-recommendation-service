export function MovieCard({ movie }) {
  const {
    title,
    overview,
    posterPath,
    backdropUrl,
    releaseDate,
    language,
    genres,
  } = movie;

  const image =
    backdropUrl ||
    (posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : "https://via.placeholder.com/500x750?text=No+Image");

  return (
    <article className="movie-card glass">
      <div
        className="movie-cover"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.65), rgba(0,0,0,0.2)), url(${image})`,
        }}
      >
        <div className="movie-meta">
          <span className="chip chip-lang">{language}</span>
          {releaseDate && <span className="chip">{releaseDate}</span>}
        </div>
        <h3 className="movie-title">{title}</h3>
      </div>
      <div className="movie-body">
        {genres?.length ? (
          <div className="movie-genres">
            {genres.map((g) => (
              <span key={g} className="chip subtle">
                {g}
              </span>
            ))}
          </div>
        ) : null}
        {overview && <p className="movie-overview">{overview}</p>}
      </div>
    </article>
  );
}

