<template>
  <!-- Background with animated film strip beams -->
  <div class="beams-container w-full h-full absolute top-0 left-0 -z-10">
    <FilmStripBackground
      :beam-width="2"
      :beam-height="15"
      :beam-number="12"
      :light-color="'#ffffff'"
      :speed="2"
      :noise-intensity="1.75"
      :scale="0.2"
      :rotation="0"
    />
  </div>

  <!-- Main content with title and search bar -->
  <Transition
    name="fade-slide"
    appear
  >
    <div class="flex flex-col items-center justify-center h-screen mx-auto px-4 text-center max-w-full md:max-w-[40rem] z-10">
      <h1 class="text-5xl font-bold mb-10 max-w-full">Discover movies and explore details in <strong class="underline">seconds</strong>.</h1>
      <SearchBar
        :use-events="props.useEvents"
        :use-omdb="props.useOmdb"
        require-enter
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import type { EventsInstance, OmdbInstance } from '@/composables/useTypes'

  import SearchBar from '@/components/global/SearchBar.vue'
  import FilmStripBackground from '@/components/vendor/FilmStripBackground.vue'

  const props = defineProps<{
    useEvents: EventsInstance
    useOmdb: OmdbInstance
  }>()
</script>
