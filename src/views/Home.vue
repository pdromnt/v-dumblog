<template>
  <div class="max-w-3xl mx-auto space-y-24">
    <PostCard v-for="post in posts" :key="post.filename" :post="post" />

    <!-- Archives Call to Action -->
    <div v-if="posts.length > 0"
      class="pt-20 border-t border-base-content/5 flex flex-col items-center text-center space-y-6">
      <div class="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 12h14M5 16h14" />
        </svg>
      </div>
      <div>
        <h3 class="text-2xl font-header font-bold mb-2">Want to read more?</h3>
        <p class="text-base-content/50 max-w-xs mx-auto">Browse through our archives.</p>
      </div>
      <router-link to="/archives"
        class="btn btn-outline btn-wide rounded-full font-bold border-base-content/20 hover:bg-base-content hover:text-base-100 transition-all">
        View all posts
      </router-link>
    </div>

    <!-- Empty State -->
    <div v-if="posts.length === 0" class="text-center py-20 opacity-30 space-y-4 flex flex-col items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <span class="text-xl font-header font-semibold">No stories published yet.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { helperService } from '../services/helperService';
import type { IPost, ISettings } from '../interfaces/blog';
import PostCard from '../components/PostCard.vue';

const props = defineProps<{
  settings: ISettings | null
}>();

const posts = ref<IPost[]>([]);

onMounted(async () => {
  try {
    const archive = await helperService.getArchive();
    const maxPosts = props.settings?.maxPosts || 5;
    const postsToLoad = archive.slice(0, maxPosts);

    const loadedPosts = await Promise.all(
      postsToLoad.map(item => helperService.getPost(item.filename))
    );

    posts.value = loadedPosts;
  } catch (error) {
    console.error('Error loading posts:', error);
  }
});
</script>
