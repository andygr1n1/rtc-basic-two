import { describe, expect, it } from 'vitest'
import { initialState, todoReducer, removeTodo } from './todo.slice'

describe('todoSlice', () => {
    it('Should return default state when passed an empty action', () => {
        const result = todoReducer(undefined, { type: '' })

        expect(result).toEqual(initialState)
    })
    it('Should remove a todo with "removeTodo" action', () => {
        const action = { type: removeTodo.type, payload: '4' }

        const result = todoReducer(
            { ...initialState, todos: [{ id: '4', title: 'TestTodo', completed: false }] },
            action,
        )

        expect(result).toEqual(initialState)
    })
})
