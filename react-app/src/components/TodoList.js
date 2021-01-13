import { ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';

function TodoList() {

    //Need to get session user and return todos if they exist from the db

    return (
        <UnorderedList>
            <ListItem >Todo 1</ListItem>
            <ListItem >Todo 2</ListItem>
        </UnorderedList>
    )
}

export default TodoList;