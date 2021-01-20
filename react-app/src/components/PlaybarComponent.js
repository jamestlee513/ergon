import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
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
    const [isPlaying, setIsPlaying] = useState(true);
    const [pausePlayIconSize, setPausePlayIconSize] = useState("40px");
    const [nextIconSize, setNextIconSize] = useState("40px");
    const [mutedIconSize, setMutedIconSize] = useState("40px");
    const [isMuted, setIsMuted] = useState(false);
    const ref = React.createRef();

    const playNextSong = () => {
        if (currentSongIdx + 1 === playlist.length) {
            setCurrentSongIdx(0);
        } else {
            setCurrentSongIdx(currentSongIdx + 1);
        }
        ref.current.seekTo(0, "seconds");
    }

    return (
        <>
            <ReactPlayer
                className="hidden"
                url={playlist[currentSongIdx].url}
                playing={isPlaying}
                volume={0.3}
                muted={isMuted}
                ref={ref}
            />

            <Flex
                direction="row"
                align="center"
                justify="space-between"
            >
                <Box
                    fontSize="20px"
                    w="80%"
                    textAlign="center"
                >{playlist[currentSongIdx].title}</Box>
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
            </Flex>
        </>
    )
}

export default PlaybarComponent;