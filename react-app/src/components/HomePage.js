import React, { useEffect } from 'react';
import { Box, Grid, GridItem, useToast } from '@chakra-ui/react';
import PomodoroTimer from './HomePageComponents/PomodoroTimer';
import TodoList from './HomePageComponents/TodoComponent/TodoList';
import { useSelector } from 'react-redux';
import PlaybarComponent from './HomePageComponents/PlaybarComponent';
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
    }, [])

    return (
        <Grid
            h="100%"
            w="100%"
            gridTemplateColumns="6fr 4fr 4fr 3fr"
            gridTemplateRows="70px 5fr 400px 1fr"
        >
            <GridItem colSpan={4}>
                <NavBar />
            </GridItem>
            <GridItem
                // margin={3}
                border='1px'
                borderColor="gray.400"
                colSpan={3}
                borderRadius={4}
                boxShadow="md"
            >
                <PomodoroTimer />
            </GridItem>
            <GridItem
                // margin={3}
                border='1px'
                borderColor="gray.400"
                borderRadius={4}
                boxShadow="md"
                rowSpan={3}
            ><CalendarFrame /></GridItem>
            <GridItem
                // margin={3}
                border='1px'
                borderColor="gray.400"
                borderRadius={4}
                boxShadow="md"
            >
                <TodoList />
            </GridItem>
            <GridItem
                // margin={3}
                border='1px'
                borderColor="gray.400"
                borderRadius={4}
                boxShadow="md"
            >
                <MemoComponent />
            </GridItem>
            <GridItem
                // margin={3}
                border='1px'
                borderColor="gray.400"
                borderRadius={4}
                boxShadow="md"
            >
                <Box p={2} ml={2} fontFamily={"Roboto, monospace"}>
                    Friends (Coming soon!!!)
                </Box>
            </GridItem>
            <GridItem
                // margin={3}
                border='1px'
                borderColor="gray.400"
                borderRadius={4}
                boxShadow="md"
                colSpan={3}
            >
                <PlaybarComponent />
            </GridItem>
        </Grid>
    )
}

export default HomePage;