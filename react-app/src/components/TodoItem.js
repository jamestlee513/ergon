import { Checkbox, Flex, Icon, IconButton, ListItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React, { useContext, useState } from 'react';
import { priorityLevelToColor } from '../services/util';
import { ToDoListContext } from '../context/TodoListContext';

function TodoItem({ title, priority_level, isDone }) {

    const [isEditHidden, setIsEditHidden] = useState(true);
    const [priorityColor, setPriorityColor] = useState(priorityLevelToColor(priority_level));
    const todos = useContext(ToDoListContext);
    
    return (
        <ListItem
            m={1}
            p={2}
            pl={5}
            pr={5}
            w="100%"
            onMouseEnter={() => setIsEditHidden(false)}
            onMouseLeave={() => setIsEditHidden(true)}
            bg={priorityColor}
            h="40px"
            border="1px"
            borderColor="gray.100"
            boxShadow="sm"
        >
            <Flex
                display="flex"
                direction="row"
                justify="space-between"
                align="center"
                h="100%"
            >
                <Checkbox

                >
                    {title}
                </Checkbox>
                <IconButton
                    display={isEditHidden ? 'none' : 'default'}
                    size="sm"
                    icon={<HamburgerIcon />}
                    _hover={{
                        background: "transparent"
                    }}
                />
            </Flex>
        </ListItem>
    )
}

export default TodoItem;