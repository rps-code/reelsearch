import type { OmdbInstance } from '@/composables/useTypes'

import { ref } from 'vue'

export function useEvents(omdbInstance: OmdbInstance) {
  const query = ref('')
  const showModal = ref(false)
  const hasDoneFirstSearch = ref(false)

  // Search for movies when user submits the search
  // This also sets hasDoneFirstSearch to true to render the inner results area
  const onSearch = () => {
    omdbInstance.searchMovies(query.value)
    hasDoneFirstSearch.value = true
  }

  // Clear the search query (used when clicking the 'x' button)
  const clearQuery = () => {
    query.value = ''
  }

  // Send request to get movie details and open the modal once data is fetched
  const openMovie = async (id: string) => {
    await omdbInstance.getMovieDetails(id)
    showModal.value = true
  }

  // Close the movie details modal.. simple enough
  const closeModal = () => {
    showModal.value = false
  }

  return {
    onSearch,
    openMovie,
    closeModal,
    query,
    showModal,
    clearQuery,
    hasDoneFirstSearch
  }
}
