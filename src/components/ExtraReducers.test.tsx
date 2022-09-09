import { describe, expect, it, Mock, vitest } from 'vitest'
import { fetchTodosAsync, initialState, todoReducer } from './todo.slice'

global.fetch = vitest.fn()

describe('extraReducers', () => {
    it('should change status with "fetchTodos.pending"', () => {
        const state = todoReducer(initialState, fetchTodosAsync.pending('', undefined))
        expect(state.loading).toBe(true)
        expect(state.error).toBe(false)
    })
    it('should change status with "fetchTodos.fulfilled"', () => {
        const todoListMock = mockTodos.map((todo) => ({ ...todo, id: todo.id.toString() }))

        const state = todoReducer(initialState, fetchTodosAsync.fulfilled(todoListMock, '', undefined))
        expect(state.loading).toBe(false)
        expect(state.todos.length).toBe(3)
    })
    it('should change status with "fetchTodos.refect"', () => {
        const state = todoReducer(initialState, fetchTodosAsync.rejected(null, '', undefined))
        expect(state.error).toBe(true)
    })
})

const mockTodos = [
    {
        userId: 1,
        id: 8,
        title: 'quo adipisci enim quam ut ab',
        completed: true,
    },
    {
        userId: 1,
        id: 9,
        title: 'molestiae perspiciatis ipsa',
        completed: true,
    },
    {
        userId: 1,
        id: 10,
        title: 'illo est ratione doloremque quia maiores aut',
        completed: true,
    },
]
