import React, { useEffect } from 'react';
import { Grid, GridItem, useToast } from '@chakra-ui/react';
import PomodoroTimer from './PomodoroTimer';
import TodoList from './TodoComponent/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserTodos } from '../reducers/todoListReducer';
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
            border="1px"
            borderColor="red"
        >
            <GridItem border="1px" colSpan={3}>
                <PomodoroTimer />
            </GridItem>
            <GridItem border="1px" rowSpan={3}>Calendar Component</GridItem>
            <GridItem border="1px" >
                <TodoList />
            </GridItem>
            <GridItem border="1px" >Memo Component</GridItem>
            <GridItem border="1px" >Friends Component (Optional)</GridItem>
            <GridItem border="1px" colSpan={3}>
                <PlaybarComponent />
            </GridItem>
        </Grid>
    )
}

export default HomePage;