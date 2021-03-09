import { Box, Flex, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { determineMusicBarPercent } from '../../services/util';
import PlaybarButton from './PlaybarButton';

function PlaybarComponent() {

    const playlist = [
        {
            url: "https://www.youtube.com/watch?v=M8yB4NqlnqQ",
            title: "lofi songs for cold days"
        },
        {
            url: "https://www.youtube.com/watch?v=gR6GRn9gvkY",
            title: "lofi songs for coffee breaks"
        },
        {
            url: "https://www.youtube.com/watch?v=EFdHhgI8-fw",
            title: "lofisongs for slower days"
        }
    ]

    const [currentSongIdx, setCurrentSongIdx] = useState(0);
    const [songUrl, setSongUrl] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(null);
    const [currentSongDuration, setCurrentSongDuration] = useState(null);
    const [isLoadSuccess, setIsLoadSuccess] = useState(false);
    const { colorMode } = useColorMode();

    const ref = React.createRef();


    useEffect(() => {
        setSongUrl(playlist[currentSongIdx].url);
    }, [currentSongIdx, playlist])

    useEffect(() => {
        if (ref.current) {
            const interval = setInterval(async () => {
                setCurrentTime(Math.floor(ref.current.getCurrentTime()));
            }, 1000);
            return () => {
                clearInterval(interval);
            }
        }
    }, [ref]);

    useEffect(() => {
        // console.log(colorMode);
    }, [colorMode])

    const playNextSong = async () => {
        if (currentSongIdx + 1 === playlist.length) {
            setCurrentSongIdx(0);
            setSongUrl(playlist[0].url);
        } else {
            setCurrentSongIdx(currentSongIdx + 1);
            setSongUrl(playlist[currentSongIdx + 1].url);
        }
    }

    return (
        <Flex h="100%" w="100%" align="center">
            <ReactPlayer
                className="hidden"
                url={songUrl}
                playing={isPlaying}
                volume={0.3}
                muted={isMuted}
                ref={ref}
                onDuration={duration => setCurrentSongDuration(duration)}
                onReady={() => {
                    setIsLoadSuccess(true);
                    setIsPlaying(true);
                }}
                onError={() => setIsLoadSuccess(false)}
                onEnded={playNextSong}
            />

            {/* progress bar */}
            {isLoadSuccess ?
                <Flex
                    direction="row"
                    align="center"
                    justify="space-between"
                    w="100%"
                    h="100%"
                >
                    <Box
                        fontSize="14px"
                        w="20%"
                        textAlign="center"
                        fontFamily={"Roboto Mono, monospace"}

                    >
                        {playlist[currentSongIdx].title}
                    </Box>
                    <Flex
                        h="30px"
                        w="60%"
                        border="1px"
                        align="center"
                        justify="center"
                        position="relative"
                        borderColor={colorMode === 'light' ? "gray.200" : "gray.600"}
                        boxShadow="sm"
                        borderRadius="lg"
                    >
                        <Box
                            m="10px"
                            h="10px"
                            w="95%"
                            border="1px"
                            borderRadius="md"
                            backgroundColor={colorMode === 'light' ? "gray.200" : "gray.600"}
                            borderColor="gray.300">
                        </Box>
                        {(currentTime !== null && currentSongDuration !== null) && <Box
                            h="15px"
                            w="15px"
                            border="1px"
                            borderColor={colorMode === 'light' ? "gray.200" : "gray.800"}
                            borderRadius="50%"
                            position="absolute"
                            left={determineMusicBarPercent(currentTime, currentSongDuration)}
                            backgroundColor={colorMode === 'light' ? "blue.200" : "blue.400"}
                        >
                        </Box>}
                    </Flex>

                    {/* Playbar controls */}
                    <Flex>
                        {/* Pause */}
                        {isPlaying &&
                            <PlaybarButton
                                toggleFunction={() => setIsPlaying(false)}
                                lightSrc="https://img.icons8.com/carbon-copy/100/000000/pause.png"
                                darkSrc="https://img.icons8.com/dotty/80/ffffff/pause.png" />}

                        {!isPlaying &&
                            <PlaybarButton
                                toggleFunction={() => setIsPlaying(true)}
                                lightSrc="https://img.icons8.com/carbon-copy/100/000000/play.png"
                                darkSrc="https://img.icons8.com/dotty/80/ffffff/play.png"
                            />
                        }
                        <PlaybarButton
                            toggleFunction={playNextSong}
                            lightSrc="https://img.icons8.com/dotty/80/000000/fast-forward.png"
                            darkSrc="https://img.icons8.com/wired/64/ffffff/fast-forward.png"
                        />
                        {isMuted &&
                            <PlaybarButton
                                toggleFunction={() => setIsMuted(false)}
                                lightSrc="https://img.icons8.com/dotty/80/000000/mute.png"
                                darkSrc="https://img.icons8.com/dotty/80/ffffff/mute.png"
                            />
                        }
                        {!isMuted &&
                            <PlaybarButton
                                toggleFunction={() => setIsMuted(true)}
                                lightSrc="https://img.icons8.com/dotty/80/000000/room-sound.png"
                                darkSrc="https://img.icons8.com/dotty/80/ffffff/room-sound.png"
                            />}
                    </Flex>
                </Flex> : (
                    <Box ml="5%">
                        Loading...
                    </Box>
                )}
        </Flex>
    )
}

export default PlaybarComponent;