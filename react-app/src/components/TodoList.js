import { Button, ListItem, UnorderedList } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ToDoListContext, TodosProvider } from '../context/TodoListContext';
import TodoItem from './TodoItem';
import { DispatchContext } from '../context/TodoListContext';
import { addTodo } from '../reducers/TodoListReducer';
function TodoList() {

        //Need to get session user and return todos if they exist from the db
        const dispatch = useContext(DispatchContext);
        console.log(dispatch)
        return (
            <TodosProvider>
                <Button>{dispatch}</Button>
                <UnorderedList
                    listStyleType='none'
                    p={2}
                    m={1}>
                    <TodoItem title='Finish Capstone' priority_level={3} isDone={false} />
                </UnorderedList>
            </TodosProvider>

        )
    }

export default TodoList;