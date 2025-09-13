import type { Movie, MovieDetails } from '@/composables/useTypes'

import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

import axios from 'axios'

// Set constants for the OMDB API - as publishing to GitHub, we use a .env variable for the key
const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com/'

export function useOmdb() {
  const movies = ref<Movie[]>([])
  const selectedMovie = ref<MovieDetails | null>(null)
  const isSearching = ref(false)
  const isLoadingDetails = ref(false)
  const error = ref<string | null>(null)

  // This composable consists of two main functions:
  // 1. searchMovies - to search for movies by title
  // 2. getMovieDetails - to fetch detailed info for a specific movie by ID

  const searchMovies = useDebounceFn(async (query: string) => {
    // Should never run, but just in case
    if (!query.trim()) return

    // isSearching state to show loading spinner in the UI
    isSearching.value = true
    error.value = null

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          s: query
        }
      })

      const { data } = response

      // OMDB API returns Response: 'True' or 'False' in the response body
      // I know, it's weird and I don't like it either
      if (data.Response === 'True') {
        movies.value = data.Search
      } else {
        movies.value = []
        error.value = data.Error
      }
    } catch (err) {
      movies.value = []
      error.value = 'Something went wrong searching for movies'
      console.error(err)
    } finally {
      isSearching.value = false
    }
  }, 200)

  const getMovieDetails = async (movieId: string) => {
    // isLoadingDetails state to show loading text in the UI
    isLoadingDetails.value = true
    error.value = null

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          i: movieId
        }
      })

      const { data } = response

      if (data.Response === 'True') {
        selectedMovie.value = data
      } else {
        selectedMovie.value = null
        error.value = data.Error
      }
    } catch (err) {
      selectedMovie.value = null
      error.value = 'Could not load movie details'
      console.error(err)
    } finally {
      isLoadingDetails.value = false
    }
  }

  return {
    movies,
    selectedMovie,
    isSearching,
    isLoadingDetails,
    error,
    searchMovies,
    getMovieDetails
  }
}
