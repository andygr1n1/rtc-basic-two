import { useEffect } from 'react'
import { AddTodo } from './components/AddTodo'
import { fetchTodosAsync } from './components/todo.slice'
import { Todolist } from './components/Todolist'
import { useAppDispatch } from './redux'

export const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodosAsync())
    }, [])

    return (
        <div className='app'>
            <AddTodo />
            <Todolist />
        </div>
    )
}
