<template>
  <div class="min-h-screen text-white flex flex-col items-center pt-22 pb-5 px-4">
    <!-- Search -->
    <div class="w-full max-w-xl mx-auto mb-8 text-center">
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <SearchBar
          :use-events="useEvents"
          :use-omdb="useOmdb"
        />
      </div>
    </div>

    <!-- Movie listings -->
    <div class="w-full max-w-[90vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <MovieCard
        v-for="movie in movies"
        :key="movie.imdbID"
        :movie="movie"
        :use-events="useEvents"
      />
    </div>

    <!-- Modal for movie details -->
    <Transition name="fade-in">
      <MovieDetails
        v-if="selectedMovie"
        :movie="selectedMovie"
        :use-events="useEvents"
        class="w-full"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import type { OmdbInstance, EventsInstance } from '@/composables/useTypes'

  import MovieCard from '@/components/MovieCard.vue'
  import MovieDetails from '@/components/MovieDetails.vue'
  import SearchBar from '@/components/global/SearchBar.vue'

  const props = defineProps<{
    useEvents: EventsInstance
    useOmdb: OmdbInstance
  }>()

  const { movies, selectedMovie } = props.useOmdb
</script>
