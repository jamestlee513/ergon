import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginSigninPage from './auth/LoginSigninPage';
import Particles from 'react-particles-js';

function SplashPage() {

    const currentUser = useSelector(state => state.user);
    if (currentUser.id) {
        return <Redirect to="/home" />
    }

    return (
        <>
            <Box
                background="linear-gradient(45deg, rgb(52, 91, 153) 0%, rgb(37, 45, 63) 100%)"
                position="absolute"
                zIndex="-3"
                h="100vh"
                w="100vw"
            >
                <Particles
                    width="3000px"
                    height="100%"
                    params={{
                        "particles": {
                            "number": {
                                "value": 80,
                                "density": {
                                    "enable": false
                                }
                            },
                            "size": {
                                "value": 2
                            },
                            "move": {
                                "direction": "up",
                                "speed": "1",
                                "out_mode": "out"
                            },
                            "line_linked": {
                                "enable": false
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onclick": {
                                    "enable": true,
                                    "mode": "remove"
                                }
                            },
                            "modes": {
                                "remove": {
                                    "particles_nb": 10
                                }
                            }
                        }
                    }} />

            </Box>
            <Flex justify="space-around" align="center" w="90%">
                <Flex align="center">
                    <Image h="200px" w="200px" src="https://i.ibb.co/RQ9wbWm/ergon-logo.png" />
                    <Box fontSize="80px" color="white" fontFamily="Roboto Mono">ergon</Box>
                </Flex>
                <LoginSigninPage />
            </Flex>
        </>
    )
}

export default SplashPage;