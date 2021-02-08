import React, { useEffect, useState } from 'react';
import { ListItem, Flex, Checkbox, Input, Box, useColorMode } from '@chakra-ui/react';
import { priorityLevelToColor } from '../../../services/util';
import { useDispatch, useSelector } from 'react-redux';
import { postNewTodo } from '../../../reducers/todoListReducer';

function TodoItemForm({ setShowTodoForm }) {

    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [newTodo, setNewTodo] = useState('');
    const [priorityLevel, setPriorityLevel] = useState(2);
    const [isError, setIsError] = useState(false);
    const { colorMode } = useColorMode();
    const todoInput = React.createRef();

    useEffect(()=> {
        if(setShowTodoForm) {
            todoInput.current.focus();
        }
    }, [setShowTodoForm])

    const createNewTodo = async e => {
        if (e.key === 'Enter') {
            const res = await dispatch(postNewTodo({
                userId: currentUser.id,
                todo: newTodo,
                priorityLevel
            }))
            if (!res.errors) {
                setNewTodo('');
                setPriorityLevel(2);
                setIsError(false);
                setShowTodoForm(false);
            } else {
                setIsError(true);
            }
        }
    }

    const toggleColorSelect = () => {
        setPriorityLevel(prevPriority => {
            if (prevPriority >= 4) {
                return 1;
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
                        bg={colorMode === 'light' ? priorityLevelToColor(priorityLevel) : priorityLevelToColor(priorityLevel + 4)}
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
                    ref={todoInput}
                    h="25px"
                    margin={2}
                    onChange={e => setNewTodo(e.target.value)}
                    onKeyDown={createNewTodo}
                    placeholder="Enter new todo..."
                    borderColor={isError ? "red.400" : "gray.200"}
                    focusBorderColor={isError && "red.300"}
                    _hover={{
                        borderColor: isError ? "red.400" : "gray.200"
                    }}
                />
            </Flex>
        </ListItem >
    )
}

export default TodoItemForm;