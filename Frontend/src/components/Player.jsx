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
    <div className="fixed bottom-0 left-0 lg:left-[250px] w-full lg:w-[calc(100%-250px)] h-[90px] bg-gradient-to-r from-black via-[#0a0a0a] to-black shadow-[0_-4px_20px_5px_rgba(0,255,150,0.2)] backdrop-blur-md flex justify-between items-center text-white px-6 z-40">
      
      {/* Left - Track Info */}
      <div className="flex items-center gap-4">
        <img
          src={track.image}
          alt="track"
          className="w-14 h-14 rounded-full object-cover shadow-[0_0_15px_3px_rgba(0,255,150,0.4)] hover:scale-105 transition-transform duration-300"
        />
        <div>
          <p className="text-base font-bold text-white drop-shadow-[0_0_2px_rgba(0,255,150,0.7)]">{track.name}</p>
          <p className="text-xs text-gray-400">{track.desc?.slice(0, 30)}...</p>
        </div>
      </div>

      {/* Center - Controls */}
      <div className="flex flex-col items-center gap-2 max-w-[50vw] w-full">
        {/* Buttons */}
        <div className="flex items-center gap-6">
          <img
            onClick={toggleShuffle}
            src={assets.shuffle_icon}
            alt="shuffle"
            className={`w-5 cursor-pointer transition-transform duration-200 hover:scale-125 ${
              shuffle ? "drop-shadow-[0_0_6px_rgba(0,255,150,0.8)] brightness-150" : ""
            }`}
          />
          <img onClick={previous} src={assets.prev_icon} alt="prev" className="w-5 cursor-pointer hover:scale-125 transition" />
          {playStatus ? (
            <img onClick={pause} src={assets.pause_icon} alt="pause" className="w-7 cursor-pointer hover:scale-110 transition" />
          ) : (
            <img onClick={play} src={assets.play_icon} alt="play" className="w-7 cursor-pointer hover:scale-110 transition" />
          )}
          <img onClick={next} src={assets.next_icon} alt="next" className="w-5 cursor-pointer hover:scale-125 transition" />
          <img
            onClick={toggleRepeat}
            src={assets.loop_icon}
            alt="repeat"
            className={`w-5 cursor-pointer transition-transform duration-200 hover:scale-125 ${
              repeat ? "drop-shadow-[0_0_6px_rgba(0,255,150,0.8)] brightness-150" : ""
            }`}
          />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 w-full">
          <p className="text-xs">{time.currentTime.minute}:{time.currentTime.second}</p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="flex-1 h-1 bg-gray-800 rounded-full relative cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 rounded-full absolute top-0 left-0 bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 shadow-[0_0_10px_rgba(0,255,150,0.6)] transition-all duration-200"
            />
          </div>
          <p className="text-xs">{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>

      {/* Right - Volume & Mute */}
      <div className="hidden lg:flex items-center gap-3">
        <img
          onClick={toggleMute}
          src={assets.speaker_icon}
          alt="mute"
          className={`w-5 cursor-pointer transition hover:scale-125 ${
            mute ? "drop-shadow-[0_0_6px_rgba(0,255,150,0.8)] brightness-150" : ""
          }`}
        />
        <img src={assets.volume_icon} alt="volume" className="w-5" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 cursor-pointer accent-green-400"
        />
      </div>
    </div>
  );
};

export default Player;
