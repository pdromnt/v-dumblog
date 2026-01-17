<template>
    <footer class="footer footer-center p-10 bg-base-200/30 text-base-content border-t border-base-content/5">
        <aside>
            <p class="font-header font-bold text-lg opacity-80">
                {{ settings?.blogTitle || 'V-Dumblog' }}
            </p>
            <p class="opacity-40 text-xs">
                &copy; {{ new Date().getFullYear() }} {{ settings?.yourName }}.
            </p>
        </aside>
    </footer>
</template>

<script setup lang="ts">
import type { ISettings } from '../interfaces/blog';

defineProps<{
    settings: ISettings | null
}>();
</script>
