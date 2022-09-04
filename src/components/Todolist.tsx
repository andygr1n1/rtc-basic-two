import { useAppSelector } from '@/redux'
import { TodoItem } from './TodoItem'

export const Todolist: React.FC = () => {
    const todos = useAppSelector((store) => store.todo$.todos)
    const { error, loading } = useAppSelector((state) => state.todo$)

    if (error) return <div>it seems to be, something happend on server</div>

    return loading ? (
        <div>loading</div>
    ) : (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    )
}
