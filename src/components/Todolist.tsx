import { useAppSelector } from '@/redux'
import { TodoListSelector } from '@/redux/selectors'
import { TodoItem } from './TodoItem'

export const Todolist: React.FC = () => {
    const { error, loading, todos } = useAppSelector(TodoListSelector)

    if (error) return <div>it seems to be, something happend on server</div>

    return loading ? (
        <div>loading</div>
    ) : (
        <ul>
            {todos?.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    )
}
