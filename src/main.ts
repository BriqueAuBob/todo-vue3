import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import './style.css'

import Index from './views/Index.vue';
import Todo from './views/Todo.vue';

import { useTodoStore } from './stores/todo';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            name: 'show',
            path: '/:name',
            component: Todo
        },
    ]
})

const app = createApp(App).use(router).use(createPinia());
useTodoStore().initialize();
app.mount('#app');
