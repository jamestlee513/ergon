import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Box, Button, Divider, Flex, FormControl, Input, InputGroup, InputLeftElement, ListItem, Stack, UnorderedList, useToast } from '@chakra-ui/react'
import { EmailIcon, InfoIcon, LockIcon } from '@chakra-ui/icons';
import { signUp } from "../../services/auth";

function SignUpForm({ authenticated, setAuthenticated }) {

    const toast = useToast();
    const [errors, setErrors] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupLoading, setSignupLoading] = useState(false);

    if (authenticated) {
        return <Redirect to="/" />
    }

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
            setAuthenticated(true);
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

    return (
        <Box bg='gray.50' w='300px' h='400px' p={3} rounded='md'>
            <Flex justify="center" align="center">
                <Stack spacing={4}>
                    {errors.length > 0 && (
                        <>
                            <UnorderedList>
                                {errors.map((error, idx) =>
                                    <ListItem key={idx}>{error}</ListItem>
                                )}
                            </UnorderedList>
                            <Divider />
                        </>
                    )}
                    <form type="submit" onSubmit={signUpUser}>
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
                            <Button
                                type="submit"
                                isLoading={signupLoading}
                            >
                                Sign up
                        </Button>
                        </Stack>
                    </form>
                </Stack>
            </Flex>
        </Box>
    )
}

export default SignUpForm;