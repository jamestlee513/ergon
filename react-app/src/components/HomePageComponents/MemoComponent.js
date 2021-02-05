import { Box, Flex, Stack, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemo, createMemo, editMemo } from '../../reducers/memoReducer';

function MemoComponent() {

    const [memo, setMemo] = useState('');
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

const handleChange = e => {
    setMemo(e.target.value);
    dispatch(editMemo(currentUser.id, e.target.value));
}

return (
    <Stack direction="column" h="100%">
        <Flex
            direction="row"
            justify="space-between"
            align="center"
            h="15%"
            p={3}
            ml={3}
            mr={3}
        >
            <Box p={2} fontWeight="bold" fontFamily={"Roboto, monospace"}>
                Memos
                </Box>
        </Flex>
        <Box p={2} m={1} h="80%">
            <Textarea h="100%"
                placeholder="Write your memos here!"
                resize="none"
                value={memo}
                onChange={handleChange}
            />
        </Box>
    </Stack>
)
}

export default MemoComponent;