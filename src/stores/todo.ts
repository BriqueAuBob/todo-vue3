import { defineStore, acceptHMRUpdate } from "pinia";
import type { Todo } from "../types/todo";

export const useTodoStore = defineStore('todos', {
    state: () => ({
		todos: [] as Todo[]
	}),

	getters: {
		sortByCompleted: state => state.todos.sort((a, b) => a.completed ? 1 : -1),
		find: state => {
			return (name: string) => state.todos.find((todo) => todo.name === name);
		}
	},

    actions: {
		initialize() {
			this.todos = JSON.parse(window.localStorage.getItem('todos') || '[]');
		},

		store(data: Todo) {
			if(this.todos.find((todo) => todo.name === data.name)) {
				return 'This todo name is already used!';
			}
			this.todos.push({ ...data, tasks: [] });
			this.save();
			return ''
		},

		save() {
			this.todos.map((todo) => {
				todo.completed = todo?.tasks?.filter(task => !task.completed)?.length == 0 && todo?.tasks?.length > 0;
				return todo;
			})
			window.localStorage.setItem('todos', JSON.stringify(this.todos));
		}
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
}