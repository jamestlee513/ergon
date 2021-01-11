import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Redirect } from "react-router-dom";
import React, { useContext } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import AuthContext from '../../services/AuthProvider';

const LoginSigninPage = () => {

    const auth = useContext(AuthContext);

    if (auth.authenticated) {
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
                            <SignUpForm />
                        </Flex>
                    </TabPanel>
                    <TabPanel bg="white">
                        <Flex justify='center'>
                            <LoginForm />
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default LoginSigninPage