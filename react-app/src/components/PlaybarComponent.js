import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { determineMusicBarPercent } from '../services/util';
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
    const [pausePlayIconSize, setPausePlayIconSize] = useState("40px");
    const [nextIconSize, setNextIconSize] = useState("40px");
    const [mutedIconSize, setMutedIconSize] = useState("40px");
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSongDuration, setCurrentSongDuration] = useState(0);
    const [isLoadSuccess, setIsLoadSuccess] = useState(false);
    const ref = React.createRef();


    useEffect(() => {
        setSongUrl(playlist[currentSongIdx].url);
    }, [])

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
        <>
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

            {isLoadSuccess ? <Flex
                direction="row"
                align="center"
                justify="space-between"
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
                    border="2px"
                    align="center"
                    justify="center"
                    position="relative"
                    borderColor="gray.200"
                    boxShadow="sm"
                    borderRadius="lg"
                >
                    <Box
                        m="10px"
                        h="10px"
                        w="95%"
                        border="1px"
                        borderRadius="md"
                        backgroundColor="gray.200"
                        borderColor="gray.300">
                    </Box>
                    <Box
                        h="15px"
                        w="15px"
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="50%"
                        position="absolute"
                        left={determineMusicBarPercent(currentTime, currentSongDuration)}
                        backgroundColor="blue.200"
                    >

                    </Box>
                </Flex>
                <Flex>
                    {isPlaying && <Image
                        src="https://img.icons8.com/carbon-copy/100/000000/pause.png"
                        h={pausePlayIconSize}
                        w={pausePlayIconSize}
                        onMouseDown={() => setPausePlayIconSize("38px")}
                        onMouseUp={() => setPausePlayIconSize("40px")}
                        onMouseLeave={() => setPausePlayIconSize("40px")}
                        onMouseEnter={() => setPausePlayIconSize("42px")}
                        onClick={() => setIsPlaying(false)}
                    />}
                    {!isPlaying && <Image
                        src="https://img.icons8.com/carbon-copy/100/000000/play.png"
                        h={pausePlayIconSize}
                        w={pausePlayIconSize}
                        onMouseDown={() => setPausePlayIconSize("38px")}
                        onMouseUp={() => setPausePlayIconSize("40px")}
                        onMouseLeave={() => setPausePlayIconSize("40px")}
                        onMouseEnter={() => setPausePlayIconSize("42px")}
                        onClick={() => setIsPlaying(true)}
                    />}
                    <Image
                        src="https://img.icons8.com/dotty/80/000000/fast-forward.png"
                        h={nextIconSize}
                        w={nextIconSize}
                        onMouseDown={() => setNextIconSize("38px")}
                        onMouseUp={() => setNextIconSize("40px")}
                        onMouseLeave={() => setNextIconSize("40px")}
                        onMouseEnter={() => setNextIconSize("42px")}
                        onClick={playNextSong}
                    />
                    {isMuted && <Image
                        h={mutedIconSize}
                        w={mutedIconSize}
                        src="https://img.icons8.com/dotty/80/000000/mute.png"
                        onMouseDown={() => setMutedIconSize("38px")}
                        onMouseUp={() => setMutedIconSize("40px")}
                        onMouseLeave={() => setMutedIconSize("40px")}
                        onMouseEnter={() => setMutedIconSize("42px")}
                        onClick={() => setIsMuted(false)}
                    />}
                    {!isMuted && <Image
                        src="https://img.icons8.com/dotty/80/000000/room-sound.png"
                        h={mutedIconSize}
                        w={mutedIconSize}
                        onMouseDown={() => setMutedIconSize("38px")}
                        onMouseUp={() => setMutedIconSize("40px")}
                        onMouseLeave={() => setMutedIconSize("40px")}
                        onMouseEnter={() => setMutedIconSize("42px")}
                        onClick={() => setIsMuted(true)}
                    />}
                </Flex>
            </Flex> : (
                    <Box>
                        Loading...
                    </Box>
                )}
        </>
    )
}

export default PlaybarComponent;