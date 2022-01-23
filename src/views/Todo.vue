<template>
    <div>
        <div v-if="todo">
            <h2 class="font-semibold text-lg mb-5">{{ todo.name }}</h2>
            <div 
                v-for="(task, id) in todo.tasks"
                :key="id"
                class="bg-white text-black px-4 py-4 rounded-lg mb-4 transition ease-in duration-200 flex items-center justify-between" 
                :class="task.completed && 'line-through opacity-50'"
            >
                <div class="flex items-center gap-3">
                    <div class="border-2 border-gray-300 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer" :class="task.completed && 'bg-gray-300'" @click="complete(task)">
                        <img v-if="task.completed" src="/images/check.svg" class="w-1/2 h-1/2" />
                    </div>
                    {{ task.content }}
                </div>
                <button @click="removeTask(id)" class="focus:outline-none"><img src="/images/cross.svg" class="w-4 h-4" /></button>
            </div>
            <form class="mt-8 flex items-center justify-between mb-12" @submit.prevent>
                <input v-model="form.content" class="bg-neutral-800 rounded-xl px-5 py-3 focus:outline-none text-white w-full mr-2" placeholder="Add a task" @enter="createTask" />
                <button @click="createTask" class="bg-blue-700 px-5 py-3 rounded-xl font-semibold text-md transform transition ease-in duration-200 focus:outline-none text-white">+</button>
            </form>
        </div>
        <div v-else>
            404 Not found
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { Task } from '../types/task';
    import { useRoute } from 'vue-router';
    import { useTodoStore } from '../stores/todo';
    import { reactive } from 'vue';

    const route = useRoute()
    const todoStore = useTodoStore()
    const todo = todoStore.find(route.params.name as string);
    todo?.tasks?.sort((a: Task, b: Task) => a.completed ? 1 : -1)
    const form = reactive({
        content: ''
    });

    function createTask() {
        if(!form.content) return;
        todo?.tasks?.push({ content: form.content, completed: false });
        todoStore.save();
        form.content = '';
    }

    function removeTask(id: number) {
        todo?.tasks?.splice(id, 1);
        todoStore.save();
    }

    function complete(task: Task) {
        task.completed = !task.completed;
        todoStore.save();
    }
</script>