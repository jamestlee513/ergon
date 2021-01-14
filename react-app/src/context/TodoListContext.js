import React, { createContext, useEffect, useReducer } from 'react';
import ToDoListReducer from '../reducers/TodoListReducer';

export const ToDoListContext = createContext();
export const DispatchContext = createContext();


export const TodosProvider = (props) => {
    const [todos, dispatch] = useReducer(ToDoListReducer, {});
    console.log(dispatch);

    return (
        <ToDoListContext.Provider value={todos}>
            <DispatchContext.Provider value={dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </ToDoListContext.Provider>
    )
};