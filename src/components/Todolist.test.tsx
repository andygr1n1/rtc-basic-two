import { Todolist } from './Todolist'
import { beforeEach, describe, expect, it, afterEach, vitest } from 'vitest'
import { act } from '@testing-library/react'
import ReactDOM from 'react-dom/client'
import * as reduxHooks from '../redux/hooks'

vitest.mock('react-redux')

let container: Element | DocumentFragment

describe('Todolist', () => {
    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })
    afterEach(() => {
        container && document.body.removeChild(container)
    })

    it('should create 3 Todos', () => {
        // ;(useAppSelector as Mock).mockReturnValue({ error: true, loading: true, todos: mockTodos })
        vitest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({ error: false, loading: false, todos: mockTodos })

        act(() => {
            ReactDOM.createRoot(container).render(<Todolist />)
        })

        const TodoList = container.querySelector('ul')
        const Todos = container.querySelectorAll('li')

        expect(TodoList?.tagName).toBe('UL')

        expect(Todos.length).toBe(3)
    })

    it('should create an empty Todolist because of fetch error', () => {
        vitest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({ error: true, loading: false, todos: mockTodos })

        act(() => {
            ReactDOM.createRoot(container).render(<Todolist />)
        })

        const Todos = container.querySelectorAll('li')

        expect(Todos.length).toBe(0)
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
