<template>
  <div class="max-w-3xl mx-auto">
    <!-- Post Container -->
    <article v-if="post" class="animate-fade-in">
      <!-- Header -->
      <header class="mb-12 md:mb-20 text-center">
        <div class="flex items-center justify-center gap-4 mb-6">
          <time v-if="post.timestamp" class="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {{ helperService.parseTimestamp(post.timestamp) }}
          </time>
          <span v-if="post.editedTimestamp" class="text-[10px] opacity-30 italic">
            (Updated {{ helperService.parseTimestamp(post.editedTimestamp) }})
          </span>
        </div>

        <h1 class="text-4xl md:text-6xl font-header font-extrabold tracking-tight leading-tight mb-8">
          {{ post.postTitle }}
        </h1>

        <div class="w-24 h-1 bg-primary mx-auto rounded-full opacity-20"></div>
      </header>

      <!-- Content -->
      <div class="prose prose-lg md:prose-xl max-w-none text-base-content/90 mb-20 
                  prose-headings:font-header prose-headings:font-bold prose-headings:tracking-tight
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-3xl prose-img:shadow-2xl prose-pre:bg-base-200 prose-pre:text-base-content"
        v-html="renderMarkdown(post.postContent)">
      </div>

      <!-- Author Card (Bio) -->
      <AuthorCard :settings="settings" />

      <!-- Feedback -->
      <div v-if="props.settings?.enableMailMeAt"
        class="text-center py-12 border-t border-base-content/5 opacity-50 hover:opacity-100 transition-opacity">
        <p class="text-sm">
          Enjoyed this post? <a :href="'mailto:' + props.settings?.yourEmail" class="link hover:text-primary">Send me a
            message</a>.
        </p>
      </div>

      <!-- Footer Buttons -->
      <footer class="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
        <router-link to="/home" class="btn btn-ghost bg-base-200/50 rounded-2xl normal-case h-16 group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </router-link>
        <router-link to="/archives" class="btn btn-primary rounded-2xl normal-case h-16 shadow-lg shadow-primary/10">
          Browse Archives
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0l-7-7m7 7l-7 7" />
          </svg>
        </router-link>
      </footer>
    </article>

    <!-- Loading/Error -->
    <div v-else-if="loading" class="flex flex-col items-center justify-center py-40 animate-pulse">
      <div class="loading loading-ring loading-lg text-primary opacity-30"></div>
      <p class="mt-4 text-xs font-bold tracking-widest opacity-20 uppercase">Acquiring story...</p>
    </div>
    <div v-else class="hero py-20 bg-base-200/50 rounded-3xl border border-base-content/5">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-header font-extrabold mb-6">404</h1>
          <p class="mb-8 opacity-60">The story you're looking for has either been archived or never existed.</p>
          <router-link to="/home" class="btn btn-primary rounded-full px-8">Return Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { helperService } from '../services/helperService';
import type { IPost, ISettings } from '../interfaces/blog';
import MarkdownIt from 'markdown-it';
import AuthorCard from '../components/AuthorCard.vue';

const props = defineProps<{
  settings: ISettings | null
}>();

const route = useRoute();
const post = ref<IPost | null>(null);
const loading = ref(true);
const md = new MarkdownIt({ html: true });

const renderMarkdown = (content: string) => {
  return md.render(content || '');
};

const loadPostData = async () => {
  loading.value = true;
  const filename = route.params.filename as string;
  try {
    post.value = await helperService.getPost(filename);
    if (props.settings && post.value) {
      document.title = `${post.value.postTitle} - ${props.settings.blogTitle}`;
    }
  } catch (error) {
    console.error('Error loading post:', error);
    post.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(loadPostData);
watch(() => route.params.filename, loadPostData);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom prose link hover */
.prose a {
  position: relative;
  transition: all 0.3s;
}

.prose a::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s;
}

.prose a:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
