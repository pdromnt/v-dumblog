<template>
    <div class="group animate-fade-in">
        <article>
            <!-- Post Header -->
            <header class="mb-6">
                <div class="flex items-center gap-3 mb-4">
                    <time v-if="post.timestamp" :datetime="post.timestamp"
                        class="text-xs font-bold uppercase tracking-widest text-primary/60">
                        {{ helperService.parseTimestamp(post.timestamp) }}
                    </time>
                    <div class="h-px flex-grow bg-base-content/5"></div>
                </div>

                <h2
                    class="text-4xl md:text-5xl font-header font-extrabold tracking-tight group-hover:text-primary transition-colors leading-tight mb-4">
                    <router-link :to="'/post/' + post.filename">
                        {{ post.postTitle }}
                    </router-link>
                </h2>
            </header>

            <!-- Preview Content -->
            <div class="prose prose-lg max-w-none text-base-content/80 line-clamp-4 md:line-clamp-6 mb-8"
                v-html="renderedContent">
            </div>

            <!-- Read More Link -->
            <div class="flex items-center gap-2">
                <router-link :to="'/post/' + post.filename"
                    class="btn btn-ghost btn-sm group-hover:bg-primary/10 group-hover:text-primary rounded-full px-4 normal-case font-bold">
                    Read full article
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </router-link>
            </div>
        </article>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { helperService } from '../services/helperService';
import type { IPost } from '../interfaces/blog';
import MarkdownIt from 'markdown-it';

const props = defineProps<{
    post: IPost
}>();

const md = new MarkdownIt({ html: true });
const renderedContent = computed(() => md.render(props.post.postContent || ''));
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
