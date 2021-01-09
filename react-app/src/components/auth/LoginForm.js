import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Container, Divider, Flex, FormControl, Input, InputGroup, InputLeftElement, ListItem, Stack, toast, UnorderedList, useToast } from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { login } from "../../services/auth";

function LoginForm({ setAuthenticated }) {

    const toast = useToast();
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
            setAuthenticated(true);
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
            setAuthenticated(true);
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
                </Stack>
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

    // return (
    //     <>
    //         {errors.length > 0 && (
    //             <div>
    //                 <div>We encoutered the following errors:</div>
    //                 {errors.map((error, idx) =>
    //                     <div key={idx}>
    //                         {error}
    //                     </div>
    //                 )}
    //             </div>
    //         )}
    //         <form>
    //             <input
    //                 type="email"
    //                 placeholder="example@gmail.com"
    //                 value={email}
    //                 onChange={e => setEmail(e.target.value)}
    //             />
    //             <input
    //                 type="password"
    //                 placeholder="password"
    //                 value={password}
    //                 onChange={e => setPassword(e.target.value)}
    //             />
    //             <button type="submit" onClick={loginUser}>Log In</button>
    //             <button type="submit" onClick={loginDemo}>Log in as Demo User</button>
    //         </form>
    //     </>
    // )
}

export default LoginForm;