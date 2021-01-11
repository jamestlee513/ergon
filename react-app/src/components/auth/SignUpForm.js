import React, { useContext, useState } from "react";
import { Box, Button, Divider, Flex, FormControl, Input, InputGroup, InputLeftElement, ListItem, Stack, UnorderedList, useToast } from '@chakra-ui/react'
import { EmailIcon, InfoIcon, LockIcon } from '@chakra-ui/icons';
import { signUp } from "../../services/auth";
import AuthContext from '../../services/AuthProvider';

function SignUpForm() {

    const toast = useToast();
    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupLoading, setSignupLoading] = useState(false);



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
            auth.setAuthenticated(true);
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
                                w="100%"
                                type="submit"
                                isLoading={signupLoading}
                            >
                                Sign up
                        </Button>
                        </Stack>
                    </Flex>
                </form>
            </Flex>
        </Box>
    )
}

export default SignUpForm;