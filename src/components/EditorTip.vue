<template>
    <div class="bg-primary/5 border border-primary/10 rounded-3xl p-8 space-y-6">
        <!-- Header -->
        <div class="flex items-center gap-4 border-b border-primary/10 pb-4">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <h3 class="font-header font-bold text-lg text-primary">Workflow Guide</h3>
                <p class="text-xs font-bold uppercase tracking-widest opacity-30">How to manage your "dumb" blog</p>
            </div>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Logic Section -->
            <div class="space-y-4">
                <h4 class="text-xs font-extrabold uppercase tracking-tighter opacity-50">1. Editor Behavior</h4>
                <ul class="space-y-3">
                    <li class="flex gap-3 items-start">
                        <span class="badge badge-primary badge-outline badge-xs mt-1"></span>
                        <p class="text-sm opacity-80 leading-relaxed">
                            <span class="font-bold">Publish:</span> Downloads
                            <code class="text-primary font-bold">post-name-example.json</code> and <code
                                class="text-primary font-bold">archive.json</code>.
                        </p>
                    </li>
                    <li class="flex gap-3 items-start">
                        <span class="badge badge-ghost badge-outline badge-xs mt-1"></span>
                        <p class="text-sm opacity-60 leading-relaxed">
                            <span class="font-bold">Draft:</span> Only downloads the post file. Use this for
                            previews without updating the main feed. (Can be accessed like a normal post:
                            <code class="text-yellow-500">example.local/#/post/draft-name-example</code>)
                        </p>
                    </li>
                </ul>
            </div>

            <!-- Action Section -->
            <div class="space-y-4">
                <h4 class="text-xs font-extrabold uppercase tracking-tighter opacity-50">2. Publishing Steps</h4>
                <div class="bg-base-100/50 rounded-2xl p-4 border border-base-content/5">
                    <p class="text-sm opacity-80 leading-relaxed">
                        Move the downloaded files to:
                        <code class="block mt-2 p-2 bg-base-300/30 rounded-lg text-secondary text-center font-bold">
              public/assets/posts/
            </code>
                    </p>
                    <div class="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide opacity-30">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Then push to Git or upload to your Server
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>