import { Box, Button, Flex, Heading, useColorMode, useToast } from '@chakra-ui/react';
import React from 'react';
import { logout } from '../services/auth';
import { NavLink, useHistory } from 'react-router-dom';
import { removeUser } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

function NavBar() {

    const history = useHistory();
    const toast = useToast();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);
    const { colorMode, toggleColorMode } = useColorMode();

    
    const handleLogOut = e => {
        e.preventDefault();
        logout();
        dispatch(removeUser());
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
            bg="blue.200"
            color="white"
            w="100%"
            h="70px"
        >
            <Box>
                <Heading>
                    Ergon {colorMode}
                </Heading>
            </Box>

            <Flex
                justify="space-between"
                align="center"
                w="40%"
            >
                <NavLink exact to='/'>Home</NavLink>
                {!currentUser.id && <NavLink exact to='/signin'>Sign In</NavLink>}
                {currentUser.id && <NavLink to='/logout' onClick={handleLogOut}>Logout</NavLink>}
                <NavLink to='/'>About</NavLink>
                <NavLink to='/settings'>Settings</NavLink>
                <Button
                    bg="gray.400"
                    color="gray.100"
                    _hover={{
                        background: "gray.600"
                    }}
                    onClick={toggleColorMode}
                > {colorMode === 'light' ? "Dark" : "Light"} mode</Button>
            </Flex>

        </Flex>
    )
}

export default NavBar;