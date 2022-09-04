import { IRootStore } from './../redux/store'
import { ITodo, ITodoResponse } from '../interfaces/ITodo.interface'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        toggleTodoCompleted(state, action) {
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

export const fetchTodosAsync = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_TODOS}todos?_limit=20`)

        if (!response.ok) {
            throw new Error('fetchTodos::: server error')
        }

        const data: ITodoResponse[] | undefined = await response.json()

        return data?.map((todo) => ({ ...todo, id: todo.id.toString() }))
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodo',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_TODOS}todos/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('deleteTodo::: server error')
            }

            dispatch(removeTodo(id))
        } catch (e) {
            return rejectWithValue(e)
        }
    },
)

export const toggleTodoAsync = createAsyncThunk(
    'todos/toggleTodoAsync',
    async (id: string, { rejectWithValue, dispatch, getState }) => {
        const todo = (getState() as IRootStore).todo$.todos.find((todo) => todo.id === id)
        try {
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
                throw new Error('toggleTodoAsync::: server error')
            }

            dispatch(toggleTodoCompleted(id))
        } catch (e) {
            return rejectWithValue(e)
        }
    },
)

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (title: string, { rejectWithValue, dispatch }) => {
        if (!title.trim().length) return

        const newTodo = {
            completed: false,
            title,
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_TODOS}todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            })

            if (!response.ok) {
                throw new Error('addTodoAsync::: server error')
            }

            const data = await response.json()

            dispatch(addTodo(data))
        } catch (e) {
            return rejectWithValue(e)
        }
    },
)
