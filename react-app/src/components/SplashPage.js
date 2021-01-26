import { Flex } from '@chakra-ui/react';
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
            <div>Hi, i'll contain the splash welcome msg and fancy stuff</div>
            <LoginSigninPage />
        </Flex>
    )
}

export default SplashPage;