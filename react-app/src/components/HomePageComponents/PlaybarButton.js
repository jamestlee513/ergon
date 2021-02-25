import { Box, useColorMode } from '@chakra-ui/react';
import React from 'react';
import PreloadImage from 'react-preload-image';

function PlaybarButton({ toggleFunction, lightSrc, darkSrc }) {

    const { colorMode } = useColorMode();


    return (
        <Box
            h="40px"
            w="40px"
            onClick={toggleFunction}
            _hover={{
                cursor: "pointer",
                borderRadius: "sm",
                background: "gray.200",
                transition: "background .25s"
            }}
            _active={{
                border: "2px solid transparent",
                background: "gray.400"
            }}
        >
            {colorMode === 'light' ?
                <> <div></div>
                    <PreloadImage
                        src={lightSrc}
                        style={{
                            height: "100%",
                            width: "100%",
                            position: "relative"
                        }}
                    /></>
                :
                <PreloadImage
                    src={darkSrc}
                    style={{
                        height: "100%",
                        width: "100%",
                        position: "relative"
                    }}
                />
            }
        </Box>
    )
}

export default PlaybarButton;