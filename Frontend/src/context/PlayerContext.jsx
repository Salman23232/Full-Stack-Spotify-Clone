import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef(null); // Initialize with null
    const seekBg = useRef();
    const seekBar = useRef();
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const getSongData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/song/list");
            if (response.data) {
                setSongsData(response.data.songs);
                setTrack(response.data.songs[0]); // Set first song as default
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getAlbumsData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/album/list");
            if (response.data) {
                setAlbumsData(response.data.albums);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Play function
    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    // Pause function
    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    // Play a song by ID
    const playWithId = async (id) => {
       await songsData.map((item)=>{
        if (id === item._id) {
            setTrack(item)
        }
       })
       await audioRef.current.play()
       setPlayStatus(true)
    };

    // Previous song
    const previous = async () => {
        songsData.map(async (item,index) => {
            if (track._id === item._id && index > 0) {
                await setTrack(songsData[index-1]);
                await audioRef.current.play()
                setPlayStatus(true)
            }
        })
    };

    // Next song
    const next = async () => {
        songsData.map(async (item,index) => {
            if (track._id === item._id && index < songsData.length) {
                await setTrack(songsData[index+1]);
                await audioRef.current.play()
                setPlayStatus(true)
            }
        })
    };

    // Seek function
    const seekSong = async (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime =
                (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                if (audioRef.current.duration) {
                    seekBar.current.style.width =
                        Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100) + "%";
                    setTime({
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60)
                        },
                        totalTime: {
                            second: Math.floor(audioRef.current.duration % 60),
                            minute: Math.floor(audioRef.current.duration / 60)
                        }
                    });
                }
            };
        }
    }, [track]); // Ensure effect runs when track changes

    useEffect(() => {
        getSongData();
        getAlbumsData();
    }, []);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        songsData,
        albumsData,
        playWithId,
        previous, next
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {/* Attach audio element here */}
            <audio ref={audioRef} src={track?.url} />
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
