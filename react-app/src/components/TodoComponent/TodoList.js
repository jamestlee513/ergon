import { Box, Button, Flex, IconButton, ListItem, Stack, UnorderedList } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import React, { useContext, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoItemForm from './TodoItemForm';

function TodoList() {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Meep");
    }, [])

    const addTodoItem = () => {
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
                <TodoItem title='Finish Capstone' priority_level={3} isDone={false} />
                <TodoItemForm />
            </UnorderedList>
        </Stack>
    )
}

export default TodoList;