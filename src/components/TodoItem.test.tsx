import { TodoItem } from './TodoItem'
import { beforeEach, describe, expect, it, afterEach, vitest } from 'vitest'
import { act, screen, fireEvent } from '@testing-library/react'
import ReactDOM from 'react-dom/client'
import * as reduxHooks from '../redux/hooks'
import * as actions from './todo.slice'

vitest.mock('react-redux')

const mockedAppDispatch = vitest.spyOn(reduxHooks, 'useAppDispatch')

let container: Element | DocumentFragment

describe('Todolist', () => {
    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })
    afterEach(() => {
        container && document.body.removeChild(container)
    })

    it('should render Todo Item', () => {
        const todo = {
            id: '8',
            title: 'quo adipisci enim quam ut ab',
            completed: true,
        }

        const renderedTodo = act(() => {
            ReactDOM.createRoot(container).render(<TodoItem todo={todo} />)
        })

        const Todo = container.querySelector('li')

        expect(Todo?.tagName).toBe('LI')

        mockedAppDispatch.mockResolvedValue(vitest.fn)

        expect(renderedTodo).toMatchSnapshot()
    })

    it('should dispatch Todo actions', () => {
        const todo = {
            id: '8',
            title: 'quo adipisci enim quam ut ab',
            completed: false,
        }

        const dispatch = vitest.fn()

        mockedAppDispatch.mockReturnValue(dispatch)

        const mockedToggleComplete = vitest.spyOn(actions, 'toggleTodoAsync')

        act(() => {
            ReactDOM.createRoot(container).render(<TodoItem todo={todo} />)
        })

        fireEvent.click(screen.getByRole('checkbox'))

        expect(dispatch).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(mockedToggleComplete).toHaveBeenCalledTimes(1)
        expect(mockedToggleComplete).toBeCalledWith('8')
    })
})
