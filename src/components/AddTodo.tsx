import { useAppDispatch } from '@/redux'
import { useState } from 'react'
import { addTodoAsync } from './todo.slice'

export const AddTodo: React.FC = () => {
    const [title, setTitle] = useState('')
    const dispatch = useAppDispatch()

    const onClick = () => {
        dispatch(addTodoAsync(title))
        setTitle('')
    }

    return (
        <div>
            <label>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <button onClick={onClick}>add todo</button>
        </div>
    )
}
