import type { Task } from './task';

export type Todo = {
    emoji: string,
    name: string,
    completed: boolean,
    tasks?: Task[],
}