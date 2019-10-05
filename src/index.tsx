import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import CommentApp from './containers/CommentApp'
import store from './store'

import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <CommentApp />
    </Provider>,
    document.getElementById('root') as HTMLElement
)
