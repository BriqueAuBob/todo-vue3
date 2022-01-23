<template>
    <router-link v-if="todo" :to="{ name: 'show', params: { 'name': todo.name } }" :class="`bg-${todo.color}-500 text-white px-6 py-4 flex flex-col justify-between rounded-xl shadow-lg cursor-pointer ${todo.completed && 'opacity-25'}`">
        <div>
            <div class="text-4xl">{{ todo.emoji }}</div>
            <div class="text-xl font-semibold mt-2">{{ todo.name }}</div>
        </div>
        <div class="flex items-center justify-between mt-8">
            <div class="text-md font-semibold">{{ completed }} of {{ amount }}</div>
            <div>
                <CircleProgress :radius="24" :percent="(completed / amount) * 100" />
            </div>
        </div>
    </router-link>
</template>

<script lang="ts" setup>
    import type { Task } from '../types/task';
    import CircleProgress from './CircleProgress.vue';

    const props = defineProps({
        todo: {
            type: Object,
            required: true,
        }
    });
    const completed = props.todo?.tasks.filter((task: Task) => task.completed).length
    const amount = props.todo?.tasks.length
</script>