import { Box, Flex, Heading, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { logout } from '../services/auth';
import { NavLink, useHistory } from 'react-router-dom';
import AuthContext from '../services/AuthProvider';

function NavBar() {

    const history = useHistory();
    const toast = useToast();
    const auth = useContext(AuthContext);

    const handleLogOut = e => {
        e.preventDefault();
        logout();
        auth.setAuthenticated(false);
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
                    Ergon
                </Heading>
            </Box>

            <Flex
                justify="space-between"
                w="40%"
            >
                <NavLink exact to='/'>Home</NavLink>
                {!auth.authenticated && <NavLink exact to='/signin'>Sign In</NavLink>}
                {auth.authenticated && <NavLink to='/logout' onClick={handleLogOut}>Logout</NavLink>}
                <NavLink to='/'>About</NavLink>
                <NavLink to='/settings'>Settings</NavLink>
            </Flex>

        </Flex>
    )
}

export default NavBar;