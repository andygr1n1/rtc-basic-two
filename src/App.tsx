import { Provider } from 'react-redux'
import { rootStore } from './redux'
import { TodoApp } from './TodoApp'

export const App = () => {
    return (
        <Provider store={rootStore}>
            <TodoApp />
        </Provider>
    )
}
