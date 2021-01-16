import { Checkbox, Flex, ListItem, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { priorityLevelToColor } from '../../services/util';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo } from '../../reducers/todoListReducer';

function TodoItem({ todoId, todo, priority_level, initialIsDone }) {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);
    const [isEditHidden, setIsEditHidden] = useState(true);
    const [isDone, setIsDone] = useState(initialIsDone)
    const deleteTodo = () => {
        dispatch(removeTodo(todoId, currentUser.id));
    }
    const handleCheckoff = async () => {
        const currentCheckState = isDone;
        setIsDone(prevState => !prevState)
        await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ is_done: !currentCheckState })
        });
    }

    return (
        <ListItem
            m={1}
            p={2}
            pl={5}
            pr={5}
            w="100%"
            onMouseEnter={() => setIsEditHidden(false)}
            onMouseLeave={() => setIsEditHidden(true)}
            bg={priorityLevelToColor(priority_level)}
            h="40px"
            border="1px"
            borderColor="gray.300"
            boxShadow="sm"
            borderRadius="md"
        >
            <Flex
                display="flex"
                direction="row"
                justify="space-between"
                align="center"
                h="100%"
            >
                <Checkbox
                    onChange={handleCheckoff}
                    isChecked={isDone}
                    borderColor="gray.600"
                    colorScheme="green"
                    w="100%"
                >
                    {todo}
                </Checkbox>
                <Menu placement="right">
                    <MenuButton>
                        <HamburgerIcon
                            size="sm"
                            background="transparent"
                            _hover={{
                                background: "transparent",
                            }}
                            display={isEditHidden ? 'none' : 'default'}
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={deleteTodo}>
                            Delete
                        </MenuItem>
                        <MenuItem onClick={() => console.log("edit!")}>
                            Edit
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </ListItem >
    )
}

export default TodoItem;