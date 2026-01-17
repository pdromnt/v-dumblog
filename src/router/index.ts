import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/archives', name: 'Archives', component: () => import('../views/Archives.vue') },
    { path: '/post/:filename', name: 'Post', component: () => import('../views/Post.vue') },
    { path: '/editor', name: 'Editor', component: () => import('../views/Editor.vue') },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
