import React, { useEffect } from 'react';
import { Box, Container, Flex, Grid, GridItem, useToast } from '@chakra-ui/react';
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
                gridTemplateColumns="8fr 6fr 3fr"
                gridTemplateRows="70px 5fr 400px 1fr"
            >
                <GridItem colSpan={3}>
                    <NavBar />
                </GridItem>
                <GridItem colSpan={2} display="flex" justifyContent="center" alignItems="center">
                    <Flex
                        backgroundColor="#ededed"
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
                    <Container h="100%" w="100%" backgroundColor="#ededed">
                        <CalendarFrame />
                    </Container>
                </GridItem>
                <GridItem>
                    <Container
                        backgroundColor="#ededed"
                        m={2}
                        h="95%"
                        w="95%"
                        boxShadow="md"
                        borderRadius="md">
                        <TodoList />
                    </Container>
                </GridItem>
                <GridItem>
                    <Container
                        backgroundColor="#ededed"
                        m={2}
                        h="95%"
                        w="95%"
                        boxShadow="md"
                        borderRadius="md">
                        <MemoComponent />
                    </Container>
                </GridItem>
                {/* <GridItem>
                    <Box p={2} ml={2} fontFamily={"Roboto, monospace"}>
                        Friends (Coming soon!!!)
                </Box>
                </GridItem> */}
                <GridItem colSpan={2} backgroundColor="#b8d3ff">
                    {/* <Container w="100%" h="100%"> */}
                        <PlaybarComponent />
                    {/* </Container> */}
                </GridItem>
            </Grid>

            <Box
                background="linear-gradient(45deg, #d6edff 0%, #abdbff 100%)"
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
        </>
    )
}

export default HomePage;