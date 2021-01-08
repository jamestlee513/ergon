import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LoginSigninPage = () => {
    return (
        <Box bg='blue.100' w='400px' p={3} boxShadow='md' rounded='lg'>
            {/* Image */}
            <Tabs variant="enclosed-colored" isFitted>
                <TabList>
                    <Tab>Sign Up</Tab>
                    <Tab>Login</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex justify='center'>
                            <SignUpForm />
                        </Flex>
                    </TabPanel>
                    <TabPanel>
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