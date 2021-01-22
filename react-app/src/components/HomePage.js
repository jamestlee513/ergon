import React, { useEffect } from 'react';
import { Grid, GridItem, useToast } from '@chakra-ui/react';
import PomodoroTimer from './PomodoroTimer';
import TodoList from './TodoComponent/TodoList';
import { useSelector } from 'react-redux';
import PlaybarComponent from './PlaybarComponent';


function HomePage({ isFirstVisit, setIsFirstVisit }) {

    const currentUser = useSelector(state => state.user)
    const toast = useToast();

    useEffect(() => {
        if (!currentUser.id && isFirstVisit) {
            toast({
                title: "Welcome to Ergon!",
                description: "Feel free to use the website, however your personal settings will not save unless you are logged in!",
                duration: "10000",
                isClosable: true
            })
        } else if (currentUser.id && isFirstVisit) {
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
            gridTemplateRows="5fr 7fr 1fr"
        >
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
            >Calendar Component (Coming soon!)</GridItem>
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
            >Memo Component</GridItem>
            <GridItem
                // margin={3}
                border='1px'
                borderColor="gray.400"
                borderRadius={4}
                boxShadow="md"
            >Friends Component (Optional)</GridItem>
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