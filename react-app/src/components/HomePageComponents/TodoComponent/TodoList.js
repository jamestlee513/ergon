import { Box, Button, ButtonGroup, Flex, IconButton, Stack, UnorderedList, useColorMode } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoItemForm from './TodoItemForm';
import { loadUserTodos, clearCheckedTodos } from '../../../reducers/todoListReducer';

function TodoList() {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);
    const todos = useSelector(state => state.todos);
    const [showTodoForm, setShowTodoForm] = useState(false);
    const { colorMode } = useColorMode();

    useEffect(() => {
        dispatch(loadUserTodos(currentUser.id));
    }, [currentUser, dispatch])

    const handleClear = () => {
        dispatch(clearCheckedTodos(currentUser.id))
    }

    return (
        <Stack h="100%">
            <Flex
                direction="row"
                justify="space-between"
                align="center"
                p={3}
                ml={3}
                mr={3}
            >
                <Box p={2} fontWeight="bold" fontFamily={"Roboto, monospace"}>
                    Todo List
                </Box>
                <ButtonGroup>
                    <Button
                        size="sm"
                        onClick={handleClear}
                    >
                        Clear completed
                    </Button>
                    <IconButton
                        onClick={() => setShowTodoForm(prevState => !prevState)}
                        size="sm"
                        icon={<SmallAddIcon />}
                    />
                </ButtonGroup>
            </Flex>
            <UnorderedList
                listStyleType='none'
                p={2}
                m={1}
                overflow="auto"
                h="100%"
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                        border: colorMode === 'light' ? '' : '1px solid rgba(212, 212, 212, 0.3)',
                        transition: "border 0.5s"
                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: colorMode === 'light' ? "inset 0 0 6px #dbdbdb" : "inset 0 0 6px rgba(0, 0, 0, 0.3)",
                        transition: "border 0.5s"
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: "rgba(212, 212, 212, 0.6)",
                        borderRadius: '24px',
                    }
                }}
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