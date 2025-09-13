<template>
  <Header />
  <main>
    <Transition
      name="fade-slide"
      mode="out-in"
    >
      <!-- Home Search -->
      <section
        v-if="!hasDoneFirstSearch"
        key="home-search"
        class="transition-wrapper"
      >
        <HomeSearch
          :use-events="eventsInstance"
          :use-omdb="omdbInstance"
        />
      </section>

      <!-- Browse Movies (inner search) -->
      <section
        v-else
        key="browse-movies"
        class="transition-wrapper"
      >
        <BrowseMovies
          :use-events="eventsInstance"
          :use-omdb="omdbInstance"
        />
      </section>
    </Transition>
  </main>
</template>

<script setup lang="ts">
  import type { OmdbInstance, EventsInstance } from '@/composables/useTypes'

  import { useOmdb } from '@/composables/useOmdb'
  import { useEvents } from '@/composables/useEvents'

  import Header from './components/global/HeaderBar.vue'
  import HomeSearch from './components/HomeSearch.vue'
  import BrowseMovies from './components/BrowseMovies.vue'

  const omdbInstance: OmdbInstance = useOmdb()
  const eventsInstance: EventsInstance = useEvents(omdbInstance)

  const { hasDoneFirstSearch } = eventsInstance
</script>
