<template>
  <div class="max-w-5xl mx-auto space-y-12 animate-fade-in relative">
    <!-- Header/Toolbar -->
    <header class="flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <h1 class="text-4xl font-header font-extrabold tracking-tight mb-1">Canvas</h1>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">Markdown Editor</p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <div class="dropdown dropdown-end">
          <button tabindex="0" class="btn btn-info text-white bg-base-200/50 rounded-2xl normal-case h-12 px-6">
            Load Post
          </button>
          <ul tabindex="0"
            class="dropdown-content z-[2] menu p-2 shadow-2xl bg-base-200 border border-base-content/5 rounded-2xl w-52 mt-2">
            <li><a @click="triggerFileInput" class="py-3">From local machine</a></li>
            <li><a @click="isModalOpen = true" class="py-3">From archives</a></li>
          </ul>
        </div>

        <button @click="resetEditor"
          class="btn btn-ghost text-error/60 hover:bg-error/10 rounded-2xl normal-case h-12 px-6">
          Clear
        </button>

        <div class="join shadow-xl shadow-primary/10">
          <button @click="savePost(true)"
            class="btn btn-neutral join-item rounded-l-2xl border-none normal-case h-12 px-6">Draft</button>
          <button @click="savePost(false)"
            class="btn btn-primary join-item rounded-r-2xl border-none normal-case h-12 px-6 font-bold">Publish</button>
        </div>
      </div>
    </header>

    <input type="file" ref="fileInput" class="hidden" @change="loadFromFile" accept=".json">

    <!-- Main Editor -->
    <main class="space-y-8">
      <div class="space-y-3">
        <label class="text-xs font-bold uppercase tracking-widest opacity-30 ml-1">Article Title</label>
        <input v-model="post.postTitle" type="text" placeholder="Give your story a name..."
          class="input bg-transparent border-1 rounded-2xl border-base-content/5 focus:ring-0 text-3xl md:text-5xl font-header font-extrabold tracking-tight w-full placeholder:opacity-50 p-1 h-auto" />
      </div>

      <div class="space-y-3">
        <label class="text-xs font-bold uppercase tracking-widest opacity-30 ml-1">Markdown Content</label>
        <div
          class="editor-wrap relative rounded-3xl overflow-hidden border border-base-content/5 bg-base-100 shadow-sm">
          <textarea ref="editorArea"></textarea>
        </div>
      </div>
    </main>

    <!-- Footer Tip -->
    <EditorTip />

    <!-- Archive Selection Modal Component -->
    <ArchiveModal :is-open="isModalOpen" :archives="archives" @close="isModalOpen = false"
      @select="handleArchiveSelection" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import { saveAs } from 'file-saver';
import { helperService } from '../services/helperService';
import type { IPost, IArchive } from '../interfaces/blog';
import EditorTip from '../components/EditorTip.vue';
import ArchiveModal from '../components/ArchiveModal.vue';

const post = reactive<IPost>({
  postTitle: '',
  timestamp: '',
  editedTimestamp: '',
  postContent: '',
  filename: '',
  draft: false
});

const isModalOpen = ref(false);
const archives = ref<IArchive[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);
const editorArea = ref<HTMLTextAreaElement | null>(null);
let easyMDE: EasyMDE | null = null;

onMounted(async () => {
  try {
    archives.value = await helperService.getArchive();
  } catch (err) {
    console.error("Could not load archive:", err);
  }

  if (editorArea.value) {
    easyMDE = new EasyMDE({
      element: editorArea.value,
      placeholder: "Once upon a time...",
      spellChecker: false,
      nativeSpellcheck: true,
      minHeight: "500px",
      toolbar: [
        "bold", "italic", "heading", "|",
        "quote", "unordered-list", "ordered-list", "|",
        "link", "image", "|",
        "preview", "|",
        "guide"
      ],
      autosave: {
        enabled: true,
        uniqueId: "vdumblog-pro-v1",
        delay: 1000,
      },
      status: ["lines", "words", "cursor"],
    });

    easyMDE.codemirror.on("change", () => {
      post.postContent = easyMDE!.value();
    });
  }
});

const triggerFileInput = () => fileInput.value?.click();

const loadFromFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = JSON.parse(e.target?.result as string);
      Object.assign(post, content);
      easyMDE?.value(post.postContent);
    } catch (err) {
      alert("Invalid JSON file!");
    }
  };
  reader.readAsText(file);
  target.value = '';
};

const handleArchiveSelection = async (filename: string) => {
  try {
    const data = await helperService.getPost(filename);
    Object.assign(post, data);
    easyMDE?.value(post.postContent);
    isModalOpen.value = false;
  } catch (err) {
    console.error("Error loading post from archive:", err);
    alert("Could not load the post.");
  }
};

const resetEditor = () => {
  if (confirm("Clear workspace?")) {
    post.postTitle = '';
    post.postContent = '';
    post.timestamp = '';
    post.editedTimestamp = '';
    post.filename = '';
    post.draft = false;
    easyMDE?.value('');
    localStorage.removeItem("smde-vdumblog-pro-v1");
  }
};

const parseFilename = (title: string): string => {
  return title
    .replace(/[^a-zA-Z0-9_]+/gi, '-')
    .toLowerCase()
    .replace(/-+$/, '')
    .substring(0, 50);
};

const savePost = async (isDraft: boolean) => {
  post.draft = isDraft;
  if (!post.postTitle) post.postTitle = 'Untitled Story';
  post.filename = parseFilename(post.postTitle);

  // If we have a timestamp, it's an existing post. Update edit timestamp.
  if (post.timestamp) {
    post.editedTimestamp = helperService.generateTimestamp();
  } else if (!isDraft) {
    // Brand new post being published
    post.timestamp = helperService.generateTimestamp();
  }

  if (!isDraft) {
    // Only update archive if it's new and being published
    if (!archives.value.some(entry => entry.filename === post.filename)) {
      archives.value.unshift({
        postTitle: post.postTitle,
        timestamp: post.timestamp,
        filename: post.filename
      });

      const archiveBlob = new Blob([JSON.stringify(archives.value, null, 2)], { type: 'application/json;charset=utf-8' });
      saveAs(archiveBlob, 'archive.json');
    }
  }

  const blob = new Blob([JSON.stringify(post, null, 2)], { type: 'application/json;charset=utf-8' });
  saveAs(blob, `${post.filename}.json`);
};
</script>

<style>
/* Refined EasyMDE theme for professional look */
.editor-toolbar {
  background: hsl(var(--b2) / 0.5) !important;
  border: none !important;
  border-bottom: 1px solid hsl(var(--bc) / 0.05) !important;
  padding: 12px 20px !important;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.editor-toolbar:hover {
  opacity: 1;
}

.editor-toolbar button {
  color: hsl(var(--bc)) !important;
  border-radius: 8px !important;
}

.editor-toolbar button.active,
.editor-toolbar button:hover {
  background: hsl(var(--b3)) !important;
}

.CodeMirror {
  background: transparent !important;
  color: hsl(var(--bc)) !important;
  border: none !important;
  font-family: var(--font-sans) !important;
  font-size: 1.125rem !important;
  padding: 30px !important;
}

.editor-statusbar {
  padding: 12px 20px !important;
  opacity: 0.3;
}

/* Fix Preview Mode */
.editor-preview {
  background-color: var(--color-base-100) !important;
  color: var(--color-base-content) !important;
  padding: 2.5rem !important;
  z-index: 50 !important;
  opacity: 1 !important;
  font-family: var(--font-sans) !important;
}

/* Ensure original editor is hidden when preview is full */
.editor-preview-active {
  display: block !important;
}

/* Ensure markdown inside preview is readable and beautiful */
.editor-preview h1 {
  font-family: var(--font-header) !important;
  font-weight: 800 !important;
  font-size: 2.25rem !important;
  /* text-4xl */
  margin-bottom: 2rem !important;
  color: var(--color-base-content) !important;
}

.editor-preview h2 {
  font-family: var(--font-header) !important;
  font-weight: 700 !important;
  font-size: 1.875rem !important;
  /* text-3xl */
  margin-top: 2.5rem !important;
  margin-bottom: 1.5rem !important;
  border-bottom: 1px solid var(--color-base-content) !important;
  border-color: color-mix(in srgb, var(--color-base-content) 10%, transparent) !important;
  padding-bottom: 0.5rem !important;
  color: var(--color-base-content) !important;
}

.editor-preview p {
  line-height: 1.625 !important;
  /* leading-relaxed */
  margin-bottom: 1.5rem !important;
  font-size: 1.125rem !important;
  /* text-lg */
  color: color-mix(in srgb, var(--color-base-content) 90%, transparent) !important;
}

.editor-preview a {
  color: var(--color-primary) !important;
  text-decoration: underline !important;
  font-weight: 600 !important;
}

.editor-preview code {
  background-color: var(--color-base-200) !important;
  padding: 0.25rem 0.5rem !important;
  /* px-2 py-1 */
  border-radius: 0.5rem !important;
  /* rounded-lg */
  font-size: 0.875rem !important;
  /* text-sm */
  color: var(--color-primary) !important;
  font-family: monospace !important;
}

.editor-preview pre {
  background-color: color-mix(in srgb, var(--color-base-200) 50%, transparent) !important;
  padding: 1.5rem !important;
  /* p-6 */
  border-radius: 1rem !important;
  /* rounded-2xl */
  overflow-x: auto !important;
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  border: 1px solid color-mix(in srgb, var(--color-base-content) 5%, transparent) !important;
}

.editor-preview img {
  max-width: 100% !important;
  border-radius: 1rem !important;
  /* rounded-2xl */
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
  /* shadow-xl */
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
}

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
