import { todoReducer } from '@/components/todo.slice'
import { configureStore } from '@reduxjs/toolkit'

export const rootStore = configureStore({
    reducer: {
        todo$: todoReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootStore = ReturnType<typeof rootStore.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type IAppDispatch = typeof rootStore.dispatch
