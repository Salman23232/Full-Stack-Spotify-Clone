import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(1);
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { minute: "00", second: "00" },
    totalTime: { minute: "00", second: "00" },
  });

  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);
  const volumeBar = useRef(null);

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = updateProgress;
      audioRef.current.onended = handleEnd;
    }
  }, [track, repeat, shuffle]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = mute ? 0 : volume;
    }
  }, [mute, volume]);

  const fetchSongs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/song/list");
      if (res.data?.songs?.length) {
        setSongsData(res.data.songs);
        setTrack(res.data.songs[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAlbums = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/album/list");
      if (res.data?.albums) {
        setAlbumsData(res.data.albums);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = (id) => {
    const selectedSong = songsData.find((s) => s._id === id);
    if (selectedSong) {
      setTrack(selectedSong);
      setTimeout(() => play(), 100);
    }
  };

  const previous = () => {
    if (!track) return;
    const index = songsData.findIndex((s) => s._id === track._id);
    if (index > 0) {
      setTrack(songsData[index - 1]);
      setTimeout(() => play(), 100);
    }
  };

  const next = () => {
    if (!track) return;
    if (shuffle) {
      playRandomSong();
    } else {
      const index = songsData.findIndex((s) => s._id === track._id);
      if (index < songsData.length - 1) {
        setTrack(songsData[index + 1]);
        setTimeout(() => play(), 100);
      }
    }
  };

  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songsData.length);
    setTrack(songsData[randomIndex]);
    setTimeout(() => play(), 100);
  };

  const handleEnd = () => {
    if (repeat) {
      play();
    } else {
      next();
    }
  };

  const seekSong = (e) => {
    if (audioRef.current && seekBg.current) {
      const width = seekBg.current.offsetWidth;
      const clickX = e.nativeEvent.offsetX;
      const percentage = clickX / width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  const updateProgress = () => {
    if (!audioRef.current?.duration) return;

    if (seekBar.current && seekBg.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      seekBar.current.style.width = `${progress}%`;
    }

    setTime({
      currentTime: {
        minute: String(Math.floor(audioRef.current.currentTime / 60)).padStart(2, "0"),
        second: String(Math.floor(audioRef.current.currentTime % 60)).padStart(2, "0"),
      },
      totalTime: {
        minute: String(Math.floor(audioRef.current.duration / 60)).padStart(2, "0"),
        second: String(Math.floor(audioRef.current.duration % 60)).padStart(2, "0"),
      },
    });
  };

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    volumeBar,
    track,
    songsData,
    albumsData,
    playStatus,
    time,
    shuffle,
    repeat,
    mute,
    volume,
    play,
    pause,
    next,
    previous,
    playWithId,
    seekSong,
    setShuffle,
    setRepeat,
    setMute,
    setVolume,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      <audio ref={audioRef} src={track?.url} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
