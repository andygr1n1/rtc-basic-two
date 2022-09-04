import { IAppDispatch, IRootStore } from './../redux/store'
import { ITodo, ITodoResponse } from '../interfaces/ITodo.interface'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITodoSlice {
    todos: ITodo[]
    loading: boolean
    error: boolean
}

const initialState: ITodoSlice = {
    todos: [] as ITodo[],
    loading: false,
    error: false,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<ITodo>) {
            state.todos.push(action.payload)
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        toggleTodoCompleted(state, action: PayloadAction<string>) {
            const updatingTodo = state.todos.find((todo) => todo.id === action.payload)
            if (!updatingTodo) return

            updatingTodo.completed = !updatingTodo.completed
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodosAsync.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(fetchTodosAsync.fulfilled, (state, action) => {
            state.loading = false
            state.error = false

            if (!action.payload) {
                throw new Error('server error')
            } else {
                state.todos = action.payload
            }
        })
        builder.addCase(fetchTodosAsync.rejected, (state, action) => {
            state.loading = false
            state.error = true
            console.error(action.payload)
        })
        builder.addCase(deleteTodoAsync.rejected, (state, action) => {
            state.loading = false
            state.error = true
            console.error(action.payload)
        })
        builder.addCase(toggleTodoAsync.rejected, (state, action) => {
            state.loading = false
            state.error = true
            console.error(action.payload)
        })
        // addTodo
        builder.addCase(addTodoAsync.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            action.payload && state.todos.push(action.payload)
        })
        builder.addCase(addTodoAsync.rejected, (state, action) => {
            state.loading = false
            state.error = true
            console.error(action.payload)
        })
    },
})

export const { addTodo, removeTodo, toggleTodoCompleted } = todoSlice.actions

export const todoReducer = todoSlice.reducer

// ASYNC THUNK
// ASYNC THUNK
// ASYNC THUNK

export const fetchTodosAsync = createAsyncThunk<ITodo[] | undefined, undefined, { rejectValue: string }>(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        const response = await fetch(`${import.meta.env.VITE_TODOS}todos?_limit=20`)

        if (!response.ok) {
            return rejectWithValue('fetchTodos::: server error')
        }

        const data: ITodoResponse[] | undefined = await response.json()

        return data?.map((todo) => ({ ...todo, id: todo.id.toString() }))
    },
)

export const deleteTodoAsync = createAsyncThunk<void, string, { rejectValue: string; dispatch: IAppDispatch }>(
    'todos/deleteTodo',
    async (id: string, { rejectWithValue, dispatch }) => {
        const response = await fetch(`${import.meta.env.VITE_TODOS}todos/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            return rejectWithValue('deleteTodo::: server error')
        }

        dispatch(removeTodo(id))
    },
)

export const toggleTodoAsync = createAsyncThunk<ITodo | undefined, string, { rejectValue: string; state: IRootStore }>(
    'todos/toggleTodoAsync',
    async (id: string, { rejectWithValue, dispatch, getState }) => {
        const todo = getState().todo$.todos.find((todo) => todo.id === id)

        const response = await fetch(`${import.meta.env.VITE_TODOS}todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed: !todo?.completed,
            }),
        })

        if (!response.ok) {
            return rejectWithValue('toggleTodoAsync::: server error')
        }

        dispatch(toggleTodoCompleted(id))
    },
)

export const addTodoAsync = createAsyncThunk<ITodo | undefined, string, { rejectValue: string }>(
    'todos/addTodoAsync',
    async (title: string, { rejectWithValue }) => {
        if (!title.trim().length) return

        const newTodo = {
            completed: false,
            title,
        }

        const response = await fetch(`${import.meta.env.VITE_TODOS}todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        })

        if (!response.ok) {
            return rejectWithValue('addTodoAsync::: server error')
        }

        const data = await response.json()

        return data as ITodo
    },
)
