<template>
    <Teleport to="body">
        <div v-if="isOpen"
            class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-base-300/80 backdrop-blur-md animate-in fade-in duration-300">

            <!-- Backdrop Click to Close -->
            <div class="absolute inset-0" @click="$emit('close')"></div>

            <div
                class="bg-base-100 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-content/10 relative animate-in zoom-in-95 duration-300">
                <div class="p-8 md:p-10 border-b border-base-content/5 flex justify-between items-center bg-base-100">
                    <div>
                        <h2 class="text-3xl font-header font-extrabold tracking-tight">Select Post</h2>
                        <p class="text-xs font-bold opacity-30 uppercase tracking-[0.2em] mt-1">From your local archives
                        </p>
                    </div>
                    <button @click="$emit('close')"
                        class="btn btn-ghost btn-circle bg-base-200/50 hover:bg-error/10 hover:text-error transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="max-h-[60vh] overflow-y-auto p-6 space-y-3 custom-scrollbar">
                    <button v-for="entry in archives" :key="entry.filename" @click="$emit('select', entry.filename)"
                        class="w-full p-6 text-left bg-base-200/30 hover:bg-primary/10 rounded-3xl transition-all border border-transparent hover:border-primary/20 group relative overflow-hidden">
                        <div class="flex justify-between items-center relative z-10">
                            <div class="space-y-1">
                                <span class="text-lg font-bold group-hover:text-primary transition-colors block">{{
                                    entry.postTitle }}</span>
                                <span class="text-[10px] font-bold opacity-40 uppercase tracking-widest">{{
                                    entry.filename }}.json</span>
                            </div>
                            <div class="text-right">
                                <span class="text-xs font-bold opacity-30 tabular-nums uppercase">{{
                                    helperService.parseTimestamp(entry.timestamp) }}</span>
                            </div>
                        </div>
                        <!-- Subtle hover glow -->
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity">
                        </div>
                    </button>

                    <div v-if="archives.length === 0" class="py-24 text-center space-y-4">
                        <div
                            class="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto opacity-20">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <p class="text-sm font-bold opacity-30 uppercase tracking-[0.2em]">Archive is empty</p>
                    </div>
                </div>

                <div class="p-8 bg-base-200/30 border-t border-base-content/5">
                    <div class="flex items-center gap-3 text-primary/40">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-xs font-bold uppercase tracking-widest">Selection will replace your current work
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { helperService } from '../services/helperService';
import type { IArchive } from '../interfaces/blog';

defineProps<{
    isOpen: boolean;
    archives: IArchive[];
}>();

defineEmits<{
    (e: 'close'): void;
    (e: 'select', filename: string): void;
}>();
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(var(--bc) / 0.1);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--bc) / 0.2);
}
</style>
