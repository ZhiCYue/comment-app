import { createStore } from 'redux'
import commentsReducer from './reducer'

const store = createStore(commentsReducer)
export default store
