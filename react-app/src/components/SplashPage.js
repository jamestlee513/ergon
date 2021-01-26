import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginSigninPage from './auth/LoginSigninPage';

function SplashPage() {

    const currentUser = useSelector(state => state.user);
    if (currentUser.id) {
        return <Redirect to="/home" />
    }

    return (
        <Flex align="center">
            <Flex align="center">
                <Image h="200px" w="200px" src="https://i.ibb.co/RQ9wbWm/ergon-logo.png"/>
                <Box fontSize="80px" fontFamily="Roboto Mono">ergon</Box>
            </Flex>
            <LoginSigninPage />
        </Flex>
    )
}

export default SplashPage;