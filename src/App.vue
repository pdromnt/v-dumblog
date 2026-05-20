<template>
  <div class="min-h-screen bg-base-100 flex flex-col font-sans">
    <Navbar :settings="settings" />

    <!-- Main Content -->
    <main class="flex-grow container mx-auto max-w-5xl px-4 py-12 md:py-20">
      <router-view :settings="settings" />
    </main>

    <Footer :settings="settings" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { helperService } from './services/helperService';
import type { ISettings } from './interfaces/blog';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const settings = ref<ISettings | null>(null);

const applyTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
};

onMounted(async () => {
  try {
    settings.value = await helperService.getSettings();
    if (settings.value?.blogTitle) {
      document.title = settings.value.blogTitle;
    }
    // Apply theme from settings, default to magi
    const theme = settings.value?.theme || 'magi';
    applyTheme(theme);
  } catch (error) {
    console.error('Error loading settings:', error);
  }
});
</script>