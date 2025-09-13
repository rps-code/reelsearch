<template>
  <div class="relative">
    <div class="relative mt-5">
      <!-- Search input field -->
      <input
        v-model="query"
        @input="onInput"
        @keydown.enter="onEnterPress"
        type="text"
        placeholder="Search movies by title..."
        class="py-4 px-14 rounded-2xl bg-gray-700/30 backdrop-blur-sm border border-white/20 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 placeholder-gray-200 text-white text-lg font-medium transition-all duration-300 hover:shadow-xl w-full md:w-[25rem]"
      />

      <!-- Search icon -->
      <div class="absolute left-6 top-1/2 -translate-y-1/2 text-white pointer-events-none">
        <i class="fa-regular fa-magnifying-glass" />
      </div>

      <!-- Enter key indicator (when requireEnter is true and there's a query) -->
      <div
        v-if="requireEnter && query && !isSearching && !isLoadingDetails"
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white/80 text-xs font-medium shadow-sm border border-white/20 flex items-center gap-2 pointer-events-none"
      >
        <span>Press</span>
        <kbd class="bg-white/30 px-2 py-0.5 rounded text-xs font-mono font-bold">Enter</kbd>
      </div>

      <!-- Clear button -->
      <button
        v-else-if="query && !isSearching && !isLoadingDetails"
        @click="clearQuery()"
        class="absolute top-4 right-4 w-8 h-8 cursor-pointer rounded-full bg-gray-900/70 hover:bg-gray-700/60 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"
      >
        <i class="fa-light fa-xmark" />
      </button>
    </div>

    <!-- Loading / error states -->
    <div
      v-if="isSearching || isLoadingDetails"
      class="px-3 text-sm font-bold absolute left-1/2 -top-[.8rem] -translate-x-1/2"
    >
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
        {{ isSearching ? 'Loading...' : 'Loading details...' }}
      </div>
    </div>
    <div
      v-else-if="error"
      class="px-3 text-sm font-bold text-red-400 absolute left-1/2 -top-[.6rem] -translate-x-1/2"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { EventsInstance, OmdbInstance } from '@/composables/useTypes'

  const props = defineProps<{
    useEvents: EventsInstance
    useOmdb: OmdbInstance
    requireEnter?: boolean
  }>()

  const { onSearch, query, clearQuery } = props.useEvents
  const { isSearching, isLoadingDetails, error } = props.useOmdb

  // We want to handle these exceptions here instead of in the composable
  // As it makes more sense to have this logic in the component
  // since it's directly related to the UI/UX of the search bar
  const onInput = () => {
    if (!props.requireEnter) onSearch()
  }

  const onEnterPress = () => {
    if (query.value?.trim()) onSearch()
  }
</script>
