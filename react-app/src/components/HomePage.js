import React, { useEffect } from 'react';
import { Box, Container, Flex, Grid, GridItem, useColorMode, useToast } from '@chakra-ui/react';
import PomodoroTimer from './HomePageComponents/PomodoroTimer';
import TodoList from './HomePageComponents/TodoComponent/TodoList';
import { useSelector } from 'react-redux';
import PlaybarComponent from './HomePageComponents/PlaybarComponent';
import Particles from 'react-particles-js';
import NavBar from './NavBar';
import MemoComponent from './HomePageComponents/MemoComponent';
import CalendarFrame from './HomePageComponents/CalendarComponent/CalendarFrame';


function HomePage({ isFirstVisit, setIsFirstVisit }) {

    const currentUser = useSelector(state => state.user)
    const toast = useToast();
    const { colorMode } = useColorMode();

    useEffect(() => {
        if (currentUser.id && isFirstVisit) {
            toast({
                title: "Welcome back to Ergon!",
                duration: "5000",
                isClosable: true
            })
        }
        setIsFirstVisit(false);
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Grid
                h="100%"
                w="100%"
                gridTemplateColumns="7fr 7fr 3fr"
                gridTemplateRows="70px 5fr 400px 1fr"
            >
                <GridItem colSpan={3}>
                    <NavBar />
                </GridItem>
                <GridItem colSpan={2} display="flex" justifyContent="center" alignItems="center">
                    <Flex
                        backgroundColor={colorMode === 'light' ? "#fafafa" : "rgba(212, 232, 255, 0.6)"}
                        style={{
                            transition: "background-color .5s"
                        }}
                        justifyContent="center"
                        alignItems="center"
                        p={3}
                        m={2}
                        w="40%"
                        borderRadius="md"
                        border="gray.600"
                        boxShadow="md"
                    >
                        <PomodoroTimer />
                    </Flex>
                </GridItem>
                <GridItem rowSpan={3}>
                    <Container h="100%" w="100%" backgroundColor={colorMode === 'light' ? "#fafafa" : "rgba(212, 232, 255, 0.6)"} borderLeft="1px" borderLeftColor="gray.200" style={{transition: "background-color .5s"}}>
                        <CalendarFrame />
                    </Container>
                </GridItem>
                <GridItem display="flex" justifyContent="center" alignItems="center">
                    <Container
                        backgroundColor={colorMode === 'light' ? "#fafafa" : "rgba(212, 232, 255, 0.6)"}
                        style={{
                            transition: "background-color .5s"
                        }}
                        m={2}
                        h="95%"
                        w="75%"
                        boxShadow="md"
                        borderRadius="md">
                        <TodoList />
                    </Container>
                </GridItem>
                <GridItem display="flex" justifyContent="center" alignItems="center">
                    <Container
                        backgroundColor={colorMode === 'light' ? "#fafafa" : "rgba(212, 232, 255, 0.6)"}
                        style={{
                            transition: "background-color .5s"
                        }}
                        m={2}
                        h="95%"
                        w="75%"
                        boxShadow="md"
                        borderRadius="md">
                        <MemoComponent />
                    </Container>
                </GridItem>
                <GridItem
                    colSpan={2}
                    backgroundColor={colorMode === 'light' ? "#b8d3ff" : "rgba(92, 130, 173, 0.6)"}
                    style={{
                        transition: "background-color .5s"
                    }}
                    borderTop="1px"
                    borderTopColor="gray.200">
                    <PlaybarComponent />
                </GridItem>
            </Grid>

            <Box
                background={colorMode === 'light' ? "linear-gradient(45deg, #d6edff 0%, #abdbff 100%)" : "linear-gradient(45deg, rgb(52, 91, 153) 0%, rgb(37, 45, 63) 100%)"}
                style={{
                    transition: "background-color .5s"
                }}
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
                                "value": colorMode === 'light' ? 50 : 90,
                                "density": {
                                    "enable": false
                                }
                            },
                            "size": {
                                "value": colorMode === 'light' ? 6 : 2
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
        </>
    )
}

export default HomePage;