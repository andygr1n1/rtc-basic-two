import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { AddTodo } from './components/AddTodo'
import { fetchTodosAsync } from './components/todo.slice'
import { Todolist } from './components/Todolist'
import { rootStore, useAppDispatch } from './redux'

export const TodoApp = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodosAsync())
    }, [])

    return (
        <Provider store={rootStore}>
            <div className='app'>
                <AddTodo />
                <Todolist />
            </div>
        </Provider>
    )
}
