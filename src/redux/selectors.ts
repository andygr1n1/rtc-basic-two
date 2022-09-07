// reselect -> memoization
import { createSelector } from '@reduxjs/toolkit'
import { IRootStore } from './store'
import { ITodoSlice } from '@/components/todo.slice'
import { ITodo } from '@/interfaces/ITodo.interface'

export const getTodo$: (store: IRootStore) => ITodoSlice = (store) => store.todo$
export const getAllTodos: (store: IRootStore) => ITodo[] = (store) => store.todo$.todos
export const getActiveTodosFilter: (store: IRootStore) => string = (store) => store.todo$.filter

export const getTodosByFilter = createSelector(
    [getAllTodos, getActiveTodosFilter],
    (allTodos, activeFilter): ITodo[] | undefined => {
        if (activeFilter === 'all') return allTodos
        if (activeFilter === 'completed') return allTodos.filter((todo) => todo.completed)
        if (activeFilter === 'active') return allTodos.filter((todo) => !todo.completed)
    },
)

export const TodoListSelector = createSelector([getTodosByFilter, getTodo$], (getTodosByFilter, getTodo$) => {
    return { todos: getTodosByFilter, error: getTodo$.error, loading: getTodo$.loading }
})
