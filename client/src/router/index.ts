import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/AboutView.vue'),
        },
        {
            path: '/chat',
            name: 'chat',
            component: () => import('@/views/ChatView.vue'),
        },
        {
            path: '/create-room',
            name: 'create-room',
            component: () => import('@/views/CreateRoomView.vue'),
        },
        {
            path: '/set-token/:token?',
            name: 'set-token',
            component: () => import('@/views/SetTokenView.vue'),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return false; // Let browser handle the scroll to anchor
        }
        return { top: 0 };
    }
})

export default router
