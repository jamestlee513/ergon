import { Box, Flex, Stack, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';

function MemoComponent() {

    const [memo, setMemo] = useState('');

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
                    onChange={e => {
                        setMemo(e.target.value);
                    }}
                />
            </Box>
        </Stack>
    )
}

export default MemoComponent;