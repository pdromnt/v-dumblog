<template>
    <header class="sticky top-0 z-50">
        <div class="navbar bg-base-100/80 backdrop-blur-md border-b border-base-content/5 px-4 lg:px-8">
            <div class="navbar-start">
                <router-link to="/" class="group flex items-center gap-3">
                    <div
                        class="relative w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform overflow-hidden p-1.5 border border-base-content/5">
                        <div
                            class="absolute inset-0 bg-gradient-to-tr from-primary to-info blur-md opacity-20 group-hover:opacity-60 transition-opacity">
                        </div>

                        <img src="/favicon.ico" alt="Logo" class="relative w-full h-full object-contain z-10" />
                    </div>
                    <span class="text-xl font-header font-extrabold tracking-tight hidden md:block">
                        {{ settings?.blogTitle || 'V-Dumblog' }}
                    </span>
                </router-link>
            </div>

            <div class="navbar-center hidden sm:flex">
                <ul class="menu menu-horizontal gap-1 px-1">
                    <li>
                        <router-link to="/home" class="rounded-lg font-medium"
                            active-class="bg-primary/10 text-primary">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/archives" class="rounded-lg font-medium"
                            active-class="bg-primary/10 text-primary">Archives</router-link>
                    </li>
                    <li>
                        <router-link to="/editor" class="rounded-lg font-medium"
                            active-class="bg-primary/10 text-primary">Editor</router-link>
                    </li>
                </ul>
            </div>

            <div class="navbar-end gap-2">
                <div class="hidden lg:block mr-4">
                    <a v-if="settings?.showPoweredBy" title="Built with Vue, Tailwind & DaisyUI."
                        href="https://github.com/pdromnt/v-dumblog" target="_blank"
                        class="text-xs font-semibold opacity-30 hover:opacity-100 uppercase tracking-widest transition-opacity">
                        Powered by V-Dumblog
                    </a>
                </div>

                <!-- Mobile Dropdown -->
                <div class="sm:hidden dropdown dropdown-end">
                    <button tabindex="0" class="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-200 rounded-box w-52 border border-base-content/5">
                        <li><router-link to="/home">Home</router-link></li>
                        <li><router-link to="/archives">Archives</router-link></li>
                        <li><router-link to="/editor">Editor</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import type { ISettings } from '../interfaces/blog';

defineProps<{
    settings: ISettings | null
}>();
</script>
