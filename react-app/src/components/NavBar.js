import { Box, Flex, Heading, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import React from 'react';
import { logout } from '../services/auth';
import { NavLink, Router, useHistory } from 'react-router-dom';

function NavBar({ authenticated, setAuthenticated }) {

    const history = useHistory();
    const toast = useToast();

    const handleLogOut = e => {
        e.preventDefault();
        logout();
        setAuthenticated(false);
        toast({
            title: "Logged out",
            duration: "5000",
            isClosable: true
        })
        history.push("/");
    }

    return (
        <Flex
            justify="space-between"
            align="center"
            padding="1.5rem"
            bg="blue.100"
            color="white"
            w="100%"
            h="70px"
        >
            <Box>
                <Heading>
                    Ergon
                </Heading>
            </Box>

            <Flex
                justify="space-between"
                w="40%"
            >
                <NavLink exact to='/'>Home</NavLink>
                <NavLink exact to='/signin'>Sign In</NavLink>
                {authenticated && <NavLink to='/logout' onClick={handleLogOut}>Logout</NavLink>}
                <NavLink to='/'>About</NavLink>
                <NavLink to='/'>Settings</NavLink>
            </Flex>

        </Flex>
    )
}

export default NavBar;