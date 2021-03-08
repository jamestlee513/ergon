import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorMode, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginSigninPage from './auth/LoginSigninPage';
import Particles from 'react-particles-js';
import FadeIn from 'react-fade-in';
import PreloadImage from 'react-preload-image';

function SplashPage() {

    const currentUser = useSelector(state => state.user);
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (colorMode === 'dark') {
            toggleColorMode()
        }

        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
            const interval = setTimeout(() => {
                onOpen();
                localStorage.setItem('hasVisited', true);
            }, 2500);
            return () => {
                clearInterval(interval);
            }
        }
    // eslint-disable-next-line
    }, [])

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
                    width="100%"
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
                <FadeIn transitionDuration="2000">
                    <Flex align="center">
                        <PreloadImage style={{
                            height: "200px",
                            width: "200px",
                            position: "relative"
                        }} 
                        src="https://i.ibb.co/RQ9wbWm/ergon-logo.png" />
                        <Box fontSize="80px" color="white" fontFamily="Roboto Mono">Ergon</Box>
                    </Flex>
                </FadeIn>
                <FadeIn delay="1000" transitionDuration="2000">
                    <LoginSigninPage />
                </FadeIn>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Welcome!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box p={2} m={2} mb={1}>
                            Hi, thanks for stopping by! Ergon is a custom one-stop productivity app built to boost your work efficiency. This app was built with a React front-end and Flask back-end.
                        </Box>
                        <Flex mr={2} pr={2} pl={2} justify="flex-end">
                            -James Lee
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Flex justify="space-between" align="center" w="100%" m={2} mt={0} p={1}>
                            <Flex w="20%" justify="space-between">
                                <a href="https://github.com/jamestlee513/ergon" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/jameslee97/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                                <a href="https://angel.co/u/james-lee-146" target="_blank" rel="noopener noreferrer"><i className="fab fa-angellist"></i></a>
                            </Flex>
                            <Button onClick={onClose}>
                                Got it!
                        </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SplashPage;