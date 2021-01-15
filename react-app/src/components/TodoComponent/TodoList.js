import { Box, Button, Flex, IconButton, ListItem, Stack, UnorderedList } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoItemForm from './TodoItemForm';
import { loadUserTodos } from '../../reducers/todoListReducer';

function TodoList() {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);
    const todos = useSelector(state => state.todos);
    useEffect(() => {
        dispatch(loadUserTodos(currentUser.id));
    }, [])

    const addTodoItem = () => {
        console.log(todos);
        console.log("Hello")
    }

    //Need to get session user and return todos if they exist from the db
    return (
        <Stack>
            <Flex
                direction="row"
                justify="space-between"
                p={3}
            >
                <Box>Todo List</Box>
                <IconButton
                    onClick={addTodoItem}
                    size="sm"
                    icon={<SmallAddIcon />}
                />
            </Flex>
            <UnorderedList
                listStyleType='none'
                p={2}
                m={1}>
                {todos.map(todoItem => <TodoItem 
                    title={todoItem.todo}
                    priority_level={todoItem.priority_level}
                    isDone={todoItem.is_done}
                />)}
                <TodoItemForm />
            </UnorderedList>
        </Stack>
    )
}

export default TodoList;