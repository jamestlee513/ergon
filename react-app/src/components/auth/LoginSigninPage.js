import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LoginSigninPage = () => {

    return (
        <Box bg="gray.200" border="solid 2px gray.500" w='400px' p={2} boxShadow='lg' rounded='lg'>
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