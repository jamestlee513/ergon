import React, { useContext, useEffect } from 'react';
import { Box, Grid, GridItem, SimpleGrid, useToast } from '@chakra-ui/react';
import AuthContext from '../services/AuthProvider';


function HomePage({ isFirstVisit, setIsFirstVisit }) {

    const auth = useContext(AuthContext);
    const toast = useToast();

    useEffect(() => {
        if (!auth.authenticated && isFirstVisit) {
            toast({
                title: "Welcome to Ergon!",
                description: "Feel free to use the website, however your personal settings will not save unless you are logged in!",
                duration: "10000",
                isClosable: true
            })
        } else if (auth.authenticated && isFirstVisit) {
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
            gridTemplateRows="5fr 7fr 80px"
            border="1px"
            borderColor="red"
        >
            <GridItem border="1px" colSpan={3}>Pomodoro Component</GridItem>
            <GridItem border="1px" rowSpan={3}>Calendar Component</GridItem>
            <GridItem border="1px" >TodoList Component</GridItem>
            <GridItem border="1px" >Memo Component</GridItem>
            <GridItem border="1px" >Friends Component (Optional)</GridItem>
            <GridItem border="1px" colSpan={3}>Playbar Component</GridItem>
        </Grid>
    )
}

export default HomePage;