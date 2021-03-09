import { Box, Button, Flex, Heading, IconButton, Image, useColorMode, useToast } from '@chakra-ui/react';
import React from 'react';
import { logout } from '../services/auth';
import { NavLink, useHistory } from 'react-router-dom';
import { removeUser } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { MoonIcon } from '@chakra-ui/icons';

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
            bg={colorMode === 'light' ? "linear-gradient(45deg, rgb(96, 147, 230) 0%, rgb(153, 192, 255) 100%)" : "linear-gradient(45deg, rgb(52, 91, 153) 0%, rgb(37, 45, 63) 100%)"}
            w="100%"
            h="70px"
            color={colorMode === 'light' ? 'gray.800' : 'white'}
        >
            <Box>
                <Flex align="center" justify="center">
                    <Image h="40px" w="40px" src="https://i.ibb.co/RQ9wbWm/ergon-logo.png" />
                    <Heading ml="15px">Ergon</Heading>
                </Flex>
            </Box>

            <Flex
                justify="space-between"
                align="center"
                w="20%"
            >
                {currentUser.id &&
                    <Button backgroundColor="transparent">
                        <NavLink
                            to='/logout'
                            onClick={handleLogOut}
                        >
                            Logout
                        </NavLink>
                    </Button>
                }
                {/* <NavLink to='/settings'>Settings</NavLink> */}
                <IconButton
                    onClick={toggleColorMode}
                    icon={<MoonIcon />}
                    bg=""
                    _hover={{
                        background: "gray.600"
                    }}
                />
                <Flex w="20%" justify="space-between" mr={2}>
                    <Button backgroundColor="transparent">
                        <a href="https://github.com/jamestlee513/ergon" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                    </Button>
                    <Button backgroundColor="transparent">
                        <a href="https://www.linkedin.com/in/jameslee97/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    </Button>
                    {/* <Button backgroundColor="transparent">
                        <a href="https://angel.co/u/james-lee-146" target="_blank" rel="noopener noreferrer"><i className="fab fa-angellist"></i></a>
                    </Button> */}
                </Flex>
            </Flex>

        </Flex>
    )
}

export default NavBar;