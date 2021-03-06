import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import memoReducer from '../reducers/memoReducer';
import todoListReducer from '../reducers/todoListReducer';
import userReducer from '../reducers/userReducer';
import eventReducer from '../reducers/eventReducer';
const rootReducer = combineReducers({
    todos: todoListReducer,
    user: userReducer,
    memo: memoReducer,
    events: eventReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;