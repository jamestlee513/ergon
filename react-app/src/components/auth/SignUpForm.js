import React, { useState } from "react";
import { Box, Button, Divider, Flex, FormControl, Input, InputGroup, InputLeftElement, ListItem, Stack, UnorderedList, useToast } from '@chakra-ui/react'
import { EmailIcon, InfoIcon, LockIcon } from '@chakra-ui/icons';
import { signUp } from "../../services/auth";
import { login } from "../../services/auth";
import { addUser } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";

function SignUpForm() {

    const toast = useToast();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupLoading, setSignupLoading] = useState(false);
    const [demoLoading, setDemoLoading] = useState(false);



    const signUpUser = async e => {
        e.preventDefault();
        setSignupLoading(true);
        const user = await signUp(
            firstname,
            lastname,
            username,
            email,
            password
        );
        if (!user.errors) {
            dispatch(addUser(user));
            toast({
                title: "Account created.",
                description: "Account signup was successful!",
                status: "success",
                duration: "5000",
                isClosable: true
            })
        } else {
            setErrors(user.errors);
        }
        setSignupLoading(false);
    }

    const loginDemo = async e => {
        e.preventDefault();
        setDemoLoading(true);
        
        const firstDemo = localStorage.getItem('firstDemo');
        if (!firstDemo) {
            await fetch('/api/users/demo_reset', { method: 'PUT' })
            localStorage.setItem('firstDemo', true);
        }
        
        const user = await login("demo@demo.com", "password");

        if (!user.errors) {
            dispatch(addUser(user));
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
                <form type="submit" onSubmit={signUpUser} h="100%">
                    <Flex direction="column" justify="space-between" h="100%">
                        <Stack spacing={3}>
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<InfoIcon />} />
                                    <Input
                                        type="name"
                                        placeholder="First name"
                                        value={firstname}
                                        onChange={e => setFirstname(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<InfoIcon />} />
                                    <Input
                                        type="name"
                                        placeholder="Last name"
                                        value={lastname}
                                        onChange={e => setLastname(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <Divider />
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<InfoIcon />} />
                                    <Input
                                        type="name"
                                        placeholder="Username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
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
                                p={2}
                                mb={2}
                                w="100%"
                                type="submit"
                                isLoading={signupLoading}
                            >
                                Sign up
                            </Button>
                            <Button
                                m={2}
                                w="100%"
                                type="submit"
                                isLoading={demoLoading}
                                onClick={loginDemo}
                                backgroundColor="orange.300"
                                _hover={{
                                    backgroundColor: "orange.600"
                                }}
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

export default SignUpForm;