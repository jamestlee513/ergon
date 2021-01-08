import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Redirect } from "react-router-dom";
import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LoginSigninPage = ({ authenticated, setAuthenticated }) => {

    console.log("Authenicated = ", authenticated);

    if (authenticated) {
        return <Redirect to="/" />
    }

    return (
        <Box bg='blue.100' w='400px' p={6} boxShadow='md' rounded='lg'>
            {/* Image */}
            <Tabs variant="enclosed-colored" isFitted>
                <TabList>
                    <Tab>Sign Up</Tab>
                    <Tab>Login</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel bg="white">
                        <Flex justify='center'>
                            <SignUpForm setAuthenticated={setAuthenticated} />
                        </Flex>
                    </TabPanel>
                    <TabPanel bg="white">
                        <Flex justify='center'>
                            <LoginForm setAuthenticated={setAuthenticated} />
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default LoginSigninPage