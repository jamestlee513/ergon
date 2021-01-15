import { Checkbox, Flex, Icon, IconButton, ListItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { priorityLevelToColor } from '../../services/util';

function TodoItem({ title, priority_level, isDone }) {

    const [isEditHidden, setIsEditHidden] = useState(true);
    const [priorityColor, setPriorityColor] = useState(priorityLevelToColor(priority_level));
    
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

                >
                    {title}
                </Checkbox>
                <IconButton
                    display={isEditHidden ? 'none' : 'default'}
                    size="sm"
                    background="transparent"
                    icon={<HamburgerIcon />}
                    _hover={{
                        background: "transparent",
                    }}
                />
            </Flex>
        </ListItem>
    )
}

export default TodoItem;