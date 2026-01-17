<template>
    <section v-if="settings"
        class="bg-base-200/50 border border-base-content/5 rounded-3xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm">
        <div v-if="settings.yourAvatar" class="flex-shrink-0">
            <div class="avatar shadow-xl">
                <div class="w-24 md:w-32 rounded-2xl">
                    <img :src="'./assets/' + settings.yourAvatar" alt="Avatar" />
                </div>
            </div>
        </div>

        <div class="flex-grow space-y-4 text-center md:text-left">
            <h3 class="text-2xl font-header font-bold opacity-90">{{ settings.yourName }}</h3>
            <p class="text-base-content/60 leading-relaxed max-w-md">{{ settings.yourBio }}</p>

            <!-- Social Icons -->
            <div class="flex flex-wrap justify-center md:justify-start gap-3">
                <a v-if="settings.facebook" :href="settings.facebook" target="_blank"
                    class="btn btn-ghost btn-circle btn-sm bg-base-100/50 hover:bg-primary hover:text-primary-content transition-all shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                </a>
                <a v-if="settings.twitter" :href="settings.twitter" target="_blank"
                    class="btn btn-ghost btn-circle btn-sm bg-base-100/50 hover:bg-primary hover:text-primary-content transition-all shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                </a>
                <a v-if="settings.instagram" :href="settings.instagram" target="_blank"
                    class="btn btn-ghost btn-circle btn-sm bg-base-100/50 hover:bg-primary hover:text-primary-content transition-all shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </a>
                <a v-if="settings.linkedin" :href="settings.linkedin" target="_blank"
                    class="btn btn-ghost btn-circle btn-sm bg-base-100/50 hover:bg-primary hover:text-primary-content transition-all shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                </a>
                <a v-if="settings.youtube" :href="settings.youtube" target="_blank"
                    class="btn btn-ghost btn-circle btn-sm bg-base-100/50 hover:bg-primary hover:text-primary-content transition-all shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z">
                        </path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ISettings } from '../interfaces/blog';

defineProps<{
    settings: ISettings | null
}>();
</script>
