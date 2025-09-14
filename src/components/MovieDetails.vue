<template>
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 min-h-screen"
  >
    <div
      ref="modal"
      class="bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
    >
      <!-- Close button -->
      <div class="relative p-6 pb-0">
        <button
          @click="closeModal"
          class="absolute top-4 right-4 w-8 h-8 cursor-pointer rounded-full bg-gray-800/60 hover:bg-gray-700/60 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"
        >
          <i class="fa-light fa-xmark" />
        </button>
      </div>

      <!-- Movie details content -->
      <div
        v-if="movie"
        class="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-2rem)] text-white"
      >
        <div class="flex flex-col md:flex-row gap-8 mb-8">
          <!-- Poster -->
          <div class="flex-shrink-0 mx-auto md:mx-0">
            <img
              :src="movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'"
              :alt="movie.Title"
              class="w-64 h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          <!-- Main info -->
          <div class="flex-1 space-y-6">
            <div>
              <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">{{ movie.Title }}</h1>
              <p
                v-if="isValid(movie.Year)"
                class="text-xl text-gray-300"
              >
                {{ movie.Year }}
              </p>
            </div>

            <!-- Rating and key stats -->
            <div class="flex flex-wrap gap-3">
              <div class="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-xl">
                <i class="fa-solid fa-star text-yellow-400" />
                <span
                  v-if="isValid(movie.imdbRating)"
                  class="font-semibold text-white"
                  >{{ movie.imdbRating }}</span
                >
                <span
                  v-if="isValid(movie.imdbVotes)"
                  class="text-sm text-gray-300"
                  >({{ movie.imdbVotes }} votes)</span
                >
              </div>
              <div
                v-if="isValid(movie.Rated)"
                class="bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-xl"
              >
                <span class="text-sm font-medium text-white">{{ movie.Rated }}</span>
              </div>
              <div
                v-if="isValid(movie.Runtime)"
                class="bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-xl"
              >
                <span class="text-sm font-medium text-white">{{ movie.Runtime }}</span>
              </div>
            </div>

            <!-- Genre chips -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="genre in movie.Genre?.split(', ')"
                :key="genre"
                class="bg-gray-800/40 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-200 border border-gray-700/50"
              >
                {{ genre }}
              </span>
            </div>

            <!-- Plot -->
            <div
              v-if="isValid(movie.Plot)"
              class="info-card"
            >
              <h3 class="info-title">Plot</h3>
              <p class="text-gray-300">{{ movie.Plot }}</p>
            </div>
          </div>
        </div>

        <!-- Detailed info grid -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <!-- Cast & Crew -->
          <div class="info-card">
            <h3 class="info-title">Cast & Crew</h3>
            <div class="space-y-4">
              <InfoItem
                v-if="isValid(movie.Director)"
                label="Director"
                :value="movie.Director"
              />
              <InfoItem
                v-if="isValid(movie.Writer)"
                label="Writer"
                :value="movie.Writer"
              />
              <InfoItem
                v-if="isValid(movie.Actors)"
                label="Cast"
                :value="movie.Actors"
              />
            </div>
          </div>

          <!-- Production info -->
          <div class="info-card">
            <h3 class="info-title">Production</h3>
            <div class="space-y-4">
              <InfoItem
                v-if="isValid(movie.Released)"
                label="Released"
                :value="movie.Released"
              />
              <InfoItem
                v-if="isValid(movie.Language)"
                label="Language"
                :value="movie.Language"
              />
              <InfoItem
                v-if="isValid(movie.Country)"
                label="Country"
                :value="movie.Country"
              />
              <InfoItem
                v-if="isValid(movie.BoxOffice)"
                label="Box Office"
                :value="movie.BoxOffice"
              />
            </div>
          </div>
        </div>

        <!-- Awards -->
        <div
          v-if="isValid(movie.Awards)"
          class="mb-8"
        >
          <div class="info-card">
            <h3 class="info-title">Awards</h3>
            <p class="text-gray-300"><i class="fa-solid fa-trophy-star text-yellow-400 mr-1" /> {{ movie.Awards }}</p>
          </div>
        </div>

        <!-- Ratings -->
        <div v-if="movie.Ratings?.length">
          <h3 class="info-title">Ratings</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="rating in movie.Ratings"
              :key="rating.Source"
              class="info-card text-center"
            >
              <p class="text-sm font-medium text-gray-400 mb-1">{{ rating.Source }}</p>
              <p class="text-xl font-bold text-white">{{ rating.Value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { MovieDetails, EventsInstance } from '@/composables/useTypes'

  import { onClickOutside } from '@vueuse/core'
  import { useTemplateRef } from 'vue'

  import InfoItem from '@/components/InfoItem.vue'

  const modal = useTemplateRef<HTMLElement>('modal')
  onClickOutside(modal, () => closeModal())

  const props = defineProps<{
    movie: MovieDetails | null
    useEvents: EventsInstance
  }>()

  const { closeModal, showModal } = props.useEvents

  // Helper function to check if value is valid (not 'N/A' and not empty, OMDB has a terrible API)
  // Realistically, we could make this more robust if needed by having a seperate "movie" composable instance
  const isValid = (value: string | undefined): boolean => !!value && value !== 'N/A'
</script>

<style scoped>
  /* Styles for the info cards, when attempting @apply here it doesnt seem to work so manually done it as a temp workaround */
  .info-card {
    background-color: rgba(31, 41, 55, 0.4);
    backdrop-filter: blur(4px);
    padding: 1.25rem;
    border-radius: 1rem;
    border: 1px solid rgba(55, 65, 81, 0.3);
  }

  .info-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1rem;
  }
</style>
