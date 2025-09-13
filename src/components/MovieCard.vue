<template>
  <div
    class="group bg-gray-900/80 rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    @click="openMovie(movie.imdbID)"
  >
    <div class="relative">
      <img
        class="w-full h-72 object-cover group-hover:opacity-90 transition-opacity duration-300"
        :src="posterSrc"
        :alt="movie.Title"
        @error="onImgError"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="absolute bottom-4 left-4 right-4">
        <h2 class="font-semibold text-white text-lg truncate mb-1">{{ movie.Title }}</h2>
        <p class="text-gray-300 text-sm">{{ movie.Year }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { EventsInstance, Movie } from '@/composables/useTypes'
  import { ref } from 'vue'

  const props = defineProps<{
    movie: Movie
    useEvents: EventsInstance
  }>()

  const { openMovie } = props.useEvents

  // Image fallback handling no use this being in a composable (inc func)
  const fallback = 'https://placehold.co/300x400/1f2937/9ca3af?text=No+Image'
  const posterSrc = ref<string>(props.movie.Poster ?? fallback)

  function onImgError() {
    posterSrc.value = fallback
  }
</script>
