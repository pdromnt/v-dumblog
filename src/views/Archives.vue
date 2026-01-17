<template>
  <div class="max-w-4xl mx-auto space-y-12 animate-fade-in">
    <!-- Header Area -->
    <header class="flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <h1 class="text-5xl font-header font-extrabold tracking-tight mb-2">History</h1>
        <p class="text-base-content/50 font-medium">Browse everything ever posted.</p>
      </div>

      <div class="relative w-full md:w-80 group">
        <div
          class="absolute inset-y-0 left-4 flex items-center pointer-events-none opacity-30 group-focus-within:opacity-100 group-focus-within:text-primary transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input v-model="searchQuery" type="text" placeholder="Filter posts..."
          class="input bg-base-200 border-none rounded-2xl w-full pl-12 h-14 font-medium focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" />
      </div>
    </header>

    <!-- Table/List -->
    <main class="bg-base-100 border border-base-content/5 rounded-3xl overflow-hidden shadow-sm">
      <div v-if="filteredArchives.length > 0" class="overflow-x-auto">
        <table class="table table-lg w-full">
          <thead>
            <tr class="bg-base-200/30 text-xs font-bold uppercase tracking-widest opacity-40">
              <th class="py-6">Title</th>
              <th class="py-6 text-right">Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-content/5">
            <tr v-for="entry in filteredArchives" :key="entry.filename"
              class="hover:bg-primary/5 transition-colors group">
              <td class="py-8">
                <router-link :to="'/post/' + entry.filename"
                  class="text-xl font-bold hover:text-primary decoration-primary/20 transition-all">
                  {{ entry.postTitle }}
                </router-link>
              </td>
              <td class="py-8 text-right">
                <span
                  class="text-sm font-bold opacity-30 group-hover:opacity-100 transition-opacity tabular-nums uppercase tracking-tighter">
                  {{ helperService.parseTimestamp(entry.timestamp) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty/No Results -->
      <div v-else class="py-32 flex flex-col items-center justify-center text-center opacity-30 space-y-4">
        <div class="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-lg font-bold">No matches found for your search.</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { helperService } from '../services/helperService';
import type { IArchive } from '../interfaces/blog';

const archives = ref<IArchive[]>([]);
const searchQuery = ref('');

const filteredArchives = computed(() => {
  if (!searchQuery.value) return archives.value;
  const lower = searchQuery.value.toLowerCase();
  return archives.value.filter(entry =>
    entry.postTitle.toLowerCase().includes(lower)
  );
});

onMounted(async () => {
  try {
    archives.value = await helperService.getArchive();
  } catch (error) {
    console.error('Error loading archives:', error);
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
