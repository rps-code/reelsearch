import type { Ref } from 'vue'

// As this is a small project, I've kept all types in one file for simplicity
// In a larger project, I would split these out into separate files

export interface OmdbInstance {
  movies: Ref<Movie[]>
  selectedMovie: Ref<MovieDetails | null>
  isSearching: Ref<boolean>
  isLoadingDetails: Ref<boolean>
  error: Ref<string | null>
  searchMovies: (query: string) => void
  getMovieDetails: (id: string) => Promise<void>
}

export interface EventsInstance {
  query: Ref<string>
  showModal: Ref<boolean>
  hasDoneFirstSearch: Ref<boolean>
  onSearch: () => void
  openMovie: (id: string) => Promise<void>
  clearQuery: () => void
  closeModal: () => void
}

export interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export interface Rating {
  Source: string
  Value: string
}

export interface MovieDetails extends Movie {
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
