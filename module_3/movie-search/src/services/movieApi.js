const API_URL = "https://api.tvmaze.com/search/shows";

export async function searchMovies(query) {
  const url = new URL(API_URL);

  url.searchParams.set("q", query);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to connect to the movie service.");
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    throw new Error("No movies found.");
  }

  return data.map((item) => ({
    id: item.show.id,
    Title: item.show.name,
    Year: item.show.premiered
      ? item.show.premiered.slice(0, 4)
      : "Unknown",
    Type: item.show.type || "TV Show",
    Poster: item.show.image?.medium || null,
  }));
}