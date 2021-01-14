import React, { useContext, useState } from 'react';
import { Box, Button, Divider, Flex, FormControl, Input, InputGroup, InputLeftElement, ListItem, Stack, UnorderedList, useToast } from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { login } from "../../services/auth";
import AuthContext from "../../services/AuthProvider";

function LoginForm() {

    const toast = useToast();
    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [demoLoading, setDemoLoading] = useState(false);

    const loginUser = async e => {
        e.preventDefault();
        setLoginLoading(true);
        const user = await login(email, password);
        if (!user.errors) {
            auth.setAuthenticated(true);
            toast({
                title: "Login success.",
                description: "Welcome back!",
                status: "success",
                duration: "5000",
                isClosable: true
            })
        } else {
            setErrors(user.errors);
        }
        setLoginLoading(false);
    }

    const loginDemo = async e => {
        e.preventDefault();
        setDemoLoading(true);
        const user = await login("demo@demo.com", "password");
        if (!user.errors) {
            auth.setAuthenticated(true);
            toast({
                title: "Login success.",
                description: "Logged in as demo user!",
                status: "success",
                duration: "5000",
                isClosable: true
            })
        } else {
            setErrors(user.errors);
        }
        setDemoLoading(false);
    }


    return (
        <Box w='300px' h='500px' p={3} rounded='md'>
            <Flex justify="center" direction="column" h="100%">
                {errors.length > 0 && (
                    <Stack
                        spacing={4}
                        bg='gray.50'
                        p={3}
                        mb={4}
                        rounded='sm'
                        border='1px'
                        borderColor='gray.100'>
                        <Box>Sorry! We encountered the following errors:</Box>
                        <UnorderedList listStyleType='none'>
                            {errors.map((error, idx) =>
                                <ListItem key={idx} color='red.500'>{error}</ListItem>
                            )}
                        </UnorderedList>
                    </Stack>
                )}
                <form type="submit" onSubmit={loginUser}>
                    <Flex direction="column" justify="space-between" h="100%">
                        <Stack spacing={3}>
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<EmailIcon />} />
                                    <Input
                                        type="email"
                                        placeholder="email@example.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<LockIcon />} />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <Divider />
                            <Button
                                m={2}
                                type="submit"
                                isLoading={loginLoading}
                            >
                                Log in
                            </Button>
                            <Button
                                m={2}
                                type="submit"
                                isLoading={demoLoading}
                                onClick={loginDemo}
                            >
                                Log in as demo user
                            </Button>
                        </Stack>
                    </Flex>
                </form>
            </Flex>
        </Box>
    )

}

export default LoginForm;