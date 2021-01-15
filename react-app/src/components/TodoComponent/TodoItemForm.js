import React, { useState } from 'react';
import { ListItem, Flex, IconButton, Checkbox, Input, Select, background, Box, Container } from '@chakra-ui/react';
import { priorityLevelToColor } from '../../services/util';
import { useDispatch, useSelector } from 'react-redux';
import { postNewTodo } from '../../reducers/todoListReducer';

function TodoItemForm() {

    const [newTodo, setNewTodo] = useState('');
    const [priorityLevel, setPriorityLevel] = useState(1);
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();

    const createNewTodo = e => {
        if (e.key === 'Enter') {
            dispatch(postNewTodo({
                userId: currentUser.id,
                todo: newTodo,
                priorityLevel
            }))
        }
    }

    const toggleColorSelect = () => {
        setPriorityLevel(prevPriority => {
            if (prevPriority >= 3) {
                return 0;
            }
            return prevPriority + 1;
        });
    }

    return (
        <ListItem
            m={1}
            p={2}
            pl={5}
            pr={5}
            w="100%"
            h="40px"
            border="1px"
            borderColor="gray.300"
            boxShadow="sm"
            borderRadius="md"
        >
            <Flex
                display="flex"
                direction="row"
                align="center"
                justify="space-between"
                h="100%"
            >
                <Flex direction="row">
                    <Checkbox isDisabled />
                    <Box
                        w="20px"
                        h="20px"
                        ml={2}
                        bg={priorityLevelToColor(priorityLevel)}
                        borderRadius="sm"
                        border="1px"
                        borderColor="gray.200"
                        onClick={toggleColorSelect}
                        _hover={{
                            cursor: "pointer",
                            border: "1.5px",
                            boxShadow: "sm"
                        }}
                    />
                </Flex>
                <Input
                    h="25px"
                    margin={2}
                    onChange={e => setNewTodo(e.target.value)}
                    onKeyDown={createNewTodo}
                />
            </Flex>
        </ListItem >
    )
}

export default TodoItemForm;