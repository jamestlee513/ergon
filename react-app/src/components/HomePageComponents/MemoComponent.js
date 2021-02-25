import { Box, Flex, Textarea, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PreloadImage from 'react-preload-image';
import { getMemo, createMemo, editMemo } from '../../reducers/memoReducer';

function MemoComponent() {

    const [memo, setMemo] = useState(undefined);
    const [isChanging, setIsChanging] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [displaySaved, setDisplaySaved] = useState(false);
    const dispatch = useDispatch();
    const { colorMode } = useColorMode();
    const currentUser = useSelector(state => state.user);

    useEffect(() => {
        (async () => {
            const res = await dispatch(getMemo(currentUser.id));
            if (res.error) {
                const secondRes = await dispatch(createMemo(currentUser.id));
                setMemo(secondRes.memo);
            } else {
                setMemo(res.memo);
            }
        })();
    }, [currentUser, dispatch])

    useEffect(() => {
        setDisplaySaved(false);
        const interval = setTimeout(async () => {
            if (memo) await dispatch(editMemo(currentUser.id, memo));
            setIsChanging(false);
        }, 2000)
        return () => {
            setIsTyping(false);
            clearInterval(interval);
        }
    // eslint-disable-next-line
    }, [isTyping, currentUser.id, dispatch])

    useEffect(() => {
        if (!isChanging) {
            setDisplaySaved(true);
            const interval = setTimeout(() => {
                setDisplaySaved(false);
            }, 1500);
            return () => {
                clearInterval(interval);
            }
        }
    }, [isChanging])


    const handleChange = e => {
        setMemo(e.target.value);
        setIsChanging(true);
        setIsTyping(true);
    }

    return (
        <>
            <Flex h="100%" direction="column">
                <Flex
                    direction="row"
                    justify="space-between"
                    align="center"
                    h="13%"
                    p={3}
                    ml={3}
                    mr={3}
                >
                    <Flex
                        p={2}
                        fontWeight="bold"
                        fontFamily={"Roboto, monospace"}
                        direction="row"
                        justify="space-between"
                        align="center"
                    >
                        <Box>Memos</Box>
                        {isChanging &&
                            <Box ml={2}>
                                <PreloadImage src="https://i.ibb.co/dDD36tB/Spinner.gif"
                                    style={{
                                        position: "relative",
                                        width: "20px",
                                        height: "20px"
                                    }}
                                    ease="none" />
                            </Box>}
                        {displaySaved &&
                            <Box ml={2} style={{
                                color: "green"
                            }}>
                                <i className="fas fa-check"></i>
                            </Box>}

                    </Flex>
                </Flex>
                <Box p={2} m={1} mt={0} h="83%">
                    <Textarea h="100%"
                        backgroundColor={colorMode === 'light' ? "#fffca1" : "#157ac2"}
                        // placeholder="Write your memos here!"
                        resize="none"
                        value={memo}
                        onChange={handleChange}
                    />
                </Box>
            </Flex >
        </>
    )
}

export default MemoComponent;