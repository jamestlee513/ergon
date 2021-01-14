import { Button, ListItem, UnorderedList } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import React, { useContext, useEffect } from 'react';
import TodoItem from './TodoItem';
import { addTodo } from '../reducers/todoListReducer';
function TodoList() {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Meep");
    }, [])

    //Need to get session user and return todos if they exist from the db
    return (
        <UnorderedList
            listStyleType='none'
            p={2}
            m={1}>
            <TodoItem title='Finish Capstone' priority_level={3} isDone={false} />
        </UnorderedList>
    )
}

export default TodoList;