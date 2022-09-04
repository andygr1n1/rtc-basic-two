import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { rootStore } from './redux'
import { App } from './App'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={rootStore}>
            <App />
        </Provider>
    </React.StrictMode>,
)
