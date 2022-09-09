import { describe, expect, it, Mock, vitest } from 'vitest'
import { fetchTodosAsync } from './todo.slice'

global.fetch = vitest.fn()

describe('todoThunk', () => {
    it('should fetchTodos with resolved response', async () => {
        const todoListMock = mockTodos.map((todo) => ({ ...todo, id: todo.id.toString() }))
        ;(fetch as Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(todoListMock),
        })

        const dispatch = vitest.fn()
        const thunk = fetchTodosAsync()

        await thunk(dispatch, () => ({}), {})

        // console.log(' dispatch.mock.calls', dispatch.mock.calls)

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2)

        const [pending, result] = calls

        expect(pending[0].type).toBe(fetchTodosAsync.pending('', undefined).type)
        expect(result[0].type).toBe('todos/fetchTodos/fulfilled')
        expect(result[0].payload).toStrictEqual(todoListMock)
    })
    it('should fetchTodos with reject response', async () => {
        ;(fetch as Mock).mockResolvedValue({
            ok: false,
            json: () => Promise.resolve('Error'),
        })

        const dispatch = vitest.fn()
        const thunk = fetchTodosAsync()

        await thunk(dispatch, () => ({}), {})

        // // console.log(' dispatch.mock.calls', dispatch.mock.calls)

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2)

        const [pending, result] = calls

        // console.log('rejectResult', result)

        expect(pending[0].type).toBe(fetchTodosAsync.pending('', undefined).type)
        expect(result[0].type).toBe(fetchTodosAsync.rejected(null, '', undefined).type)
        expect(result[0].payload).toStrictEqual('fetchTodos::: server error')
        expect(result[0].meta.rejectedWithValue).toBe(true)
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
