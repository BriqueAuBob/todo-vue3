<template>
    <div class="mt-4">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div class="lg:col-span-2">
                <div v-if="todos?.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <TodoGroup v-for="(todo, index) in todos" :key="index" :todo="todo" />
                </div>
                <div v-else>
                    No todos found
                </div>
            </div>
            <div>
                <div class="bg-neutral-900 p-8 rounded-xl shadow-xl">
                    <div class="font-semibold text-xl text-white mb-6">Create a new todo list</div>
                    <form @submit.prevent>
                        <div class="bg-red-500 px-4 text-white rounded-lg shadow-md mb-8 transition ease-in duration-200" :class="[ error ? 'opacity-1 h-auto py-3' : 'opacity-0 h-0' ]">
                            {{ error }}
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="text-3xl">{{ form.emoji }}</div>
                            <DiscordPicker 
                                :value="form.emoji"
                                @emoji="setEmoji"
                            />
                        </div>
                        <input type="text" placeholder="Name of the todo list" v-model="form.name" class="w-full bg-neutral-800 rounded-xl px-5 py-3 focus:outline-none text-white mt-6" />
                        <div class="flex flex-wrap gap-4 mt-6 mb-8">
                            <button @click="form.color = color" v-for="(color, index) in colors" :key="index" class="rounded-full w-4 h-4 focus:outline-none" :class="[`bg-${color}-500`, form.color === color && 'border-2 border-white']" />
                        </div>
                        <button 
                            :disabled="!form.name" 
                            @click="createTodo" 
                            type="submit" 
                            class="w-full text-white p-4 rounded-xl mt-4 font-semibold text-md transform transition ease-in duration-200 focus:outline-none"
                            :class="[ form.name !== '' ? 'hover:-translate-y-1 bg-blue-700 hover:bg-blue-600' : 'bg-neutral-700' ]"
                        >
                            Créer la liste
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { Todo } from '../types/todo';
    import { computed, reactive } from 'vue';
    import TodoGroup from '../components/TodoGroup.vue';
    import DiscordPicker from 'vue3-discordpicker';
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useTodoStore } from '../stores/todo';

    const todoStore = useTodoStore();
    const colors = ['blue', 'red', 'indigo', 'purple', 'gray', 'green', 'cyan', 'fuchsia', 'pink', 'orange', 'yellow'];
    const error = ref('');
    const form = reactive({
        emoji: '🥸',
        name: '',
        color: 'blue'
    });
    
    function setEmoji(e: string) {
        form.emoji = e;
    }

    const todos = computed(() => {
        return todoStore.sortByCompleted;
    })

    function createTodo() {
        error.value = todoStore.store(form as unknown as Todo);
        if(!error.value) {
            form.emoji = '🥸';
            form.name = '';
            form.color = 'blue';
        }
    }
</script>

<style>
.vue3-emojipicker .-top-4 {
    top: 31rem !important;
    z-index: 999;
}
</style>