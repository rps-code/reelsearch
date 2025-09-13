<template>
  <div class="flex flex-col">
    <span class="text-sm font-medium text-gray-400">{{ label }}</span>
    <p class="text-white mt-1">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label: string
    value: string
  }>()
</script>
