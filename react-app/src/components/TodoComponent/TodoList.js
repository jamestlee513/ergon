import { Box, Flex, IconButton, Stack, UnorderedList } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoItemForm from './TodoItemForm';
import { loadUserTodos } from '../../reducers/todoListReducer';

function TodoList() {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);
    const todos = useSelector(state => state.todos);
    const [showTodoForm, setShowTodoForm] = useState(false);
    useEffect(() => {
        dispatch(loadUserTodos(currentUser.id));
    }, [])

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
                    onClick={() => setShowTodoForm(prevState => !prevState)}
                    size="sm"
                    icon={<SmallAddIcon />}
                />
            </Flex>
            <UnorderedList
                listStyleType='none'
                p={2}
                m={1}
                overflow="auto"
                h="285px"
            >
                {showTodoForm && <TodoItemForm setShowTodoForm={setShowTodoForm} />}
                {todos.map(todoItem => <TodoItem
                    key={todoItem.id}
                    todoId={todoItem.id}
                    todo={todoItem.todo}
                    priority_level={todoItem.priority_level}
                    initialIsDone={todoItem.is_done}
                />)}
            </UnorderedList>
        </Stack>
    )
}

export default TodoList;