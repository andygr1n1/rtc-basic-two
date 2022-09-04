import { ITodo } from '@/interfaces/ITodo.interface'
import { useAppDispatch } from '@/redux'
import { deleteTodoAsync, toggleTodoAsync } from './todo.slice'

export const TodoItem: React.FC<{ todo: ITodo }> = ({ todo }) => {
    const dispatch = useAppDispatch()

    const { id } = todo

    const onChange = () => {
        dispatch(toggleTodoAsync(id))
    }

    const onDelete = () => {
        dispatch(deleteTodoAsync(id))
    }

    return (
        <li className='flex gap-5'>
            <input type='checkbox' checked={todo.completed} onChange={onChange} className='peer' />
            <div className='peer-checked:line-through'>{todo.title}</div>

            <span onClick={onDelete} className='material-icons-round cursor-pointer hover:!text-red-500'>
                delete
            </span>
        </li>
    )
}
