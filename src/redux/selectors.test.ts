import { initialState } from './../components/todo.slice'
import { describe, expect, it } from 'vitest'
import { getTodo$ } from './selectors'

describe('Redux Selectors', () => {
    it('should select Todo$', () => {
        const testTodo$ = initialState

        const result = getTodo$({ todo$: testTodo$ })

        expect(result).toBe(initialState)
    })
})
