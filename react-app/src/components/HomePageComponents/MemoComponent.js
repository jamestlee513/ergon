import { Box, Flex, Image, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemo, createMemo, editMemo } from '../../reducers/memoReducer';

function MemoComponent() {

    const [memo, setMemo] = useState(null);
    const [isChanging, setIsChanging] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const dispatch = useDispatch();
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
    }, [currentUser])

    useEffect(() => {
        const interval = setTimeout(async () => {
            if (memo) await dispatch(editMemo(currentUser.id, memo));
            setIsChanging(false);
        }, 2000)
        return () => {
            setIsTyping(false);
            clearInterval(interval);
        }
    }, [isTyping])


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
                        {isChanging && <Image src="https://i.ibb.co/dDD36tB/Spinner.gif" h="20px" w="20px" ml={2} />}

                    </Flex>
                </Flex>
                <Box p={2} m={1} mt={0} h="83%">
                    <Textarea h="100%"
                        backgroundColor="#fffca1"
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