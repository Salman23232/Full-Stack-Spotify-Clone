import { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    seekSong,
    play,
    pause,
    time,
    previous,
    next,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    mute,
    setMute,
    volume,
    setVolume,
  } = useContext(PlayerContext);

  if (!track) return null;

  const toggleMute = () => setMute((prev) => !prev);
  const toggleShuffle = () => setShuffle((prev) => !prev);
  const toggleRepeat = () => setRepeat((prev) => !prev);

  return (
    <div className="fixed bottom-0 left-0 lg:left-[250px] w-full lg:w-[calc(100%-250px)] h-[80px] bg-black flex justify-between items-center text-white px-4 z-40">
      {/* Left - Track Info */}
      <div className="flex items-center gap-3 sm:gap-4">
        <img src={track.image} alt="track" className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg object-cover shadow-lg" />
        <div>
          <p className="text-sm sm:text-base font-bold">{track.name}</p>
          <p className="text-[10px] sm:text-sm text-gray-400">{track.desc?.slice(0, 20)}...</p>
        </div>
      </div>

      {/* Center - Controls */}
      <div className="flex flex-col items-center gap-2 m-auto">
        <div className="flex items-center gap-5">
          <img onClick={toggleShuffle} src={assets.shuffle_icon} alt="shuffle" className={`w-5 cursor-pointer ${shuffle ? "brightness-200 drop-shadow-glow-green" : ""}`} />
          <img onClick={previous} src={assets.prev_icon} alt="prev" className="w-5 cursor-pointer" />
          {playStatus ? (
            <img onClick={pause} src={assets.pause_icon} alt="pause" className="w-7 cursor-pointer" />
          ) : (
            <img onClick={play} src={assets.play_icon} alt="play" className="w-7 cursor-pointer" />
          )}
          <img onClick={next} src={assets.next_icon} alt="next" className="w-5 cursor-pointer" />
          <img onClick={toggleRepeat} src={assets.loop_icon} alt="repeat" className={`w-5 cursor-pointer ${repeat ? "brightness-200 drop-shadow-glow-green" : ""}`} />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-5 w-full min-w-[40vw]">
          <p className="text-sm">{time.currentTime.minute}:{time.currentTime.second}</p>
          <div ref={seekBg} onClick={seekSong} className="flex-1 h-1 bg-gray-700 cursor-pointer rounded-full relative">
            <hr ref={seekBar} className="h-1 bg-green-500 rounded-full absolute top-0 left-0 w-full" />
          </div>
          <p className="text-sm">{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>

      {/* Right - Other Controls */}
      <div className="hidden lg:flex items-center gap-3 opacity-80">
        <img onClick={toggleMute} src={assets.speaker_icon} alt="mute" className={`w-5 cursor-pointer ${mute ? "brightness-200 drop-shadow-glow-green" : ""}`} />
        <img src={assets.volume_icon} alt="volume" className="w-5" />
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-24 cursor-pointer" />

      </div>
    </div>
  );
};

export default Player;
