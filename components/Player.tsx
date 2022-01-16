import {
    HeartIcon,
    VolumeUpIcon as VolumeDownButton,
} from "@heroicons/react/outline";
import {
    RewindIcon,
    SwitchHorizontalIcon,
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
    VolumeUpIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

function Player() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] =
        useRecoilState<any>(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState<number>(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
            setCurrentTrackId(data.body?.item?.id);
        });

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            setIsPlaying(data.body?.is_playing);
        });
    };
    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackId, spotifyApi, session]);
    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body?.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };
    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => console.log(err));
        }, 500),
        []
    );
    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume]);
    return (
        <div className="text-white h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4">
                <img
                    className="hidden md:inline h-10 w-10"
                    src={songInfo?.album?.images?.[0]?.url}
                    alt=""
                />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon
                    className="button"
                    onClick={() => spotifyApi.skipToPrevious()}
                />
                {isPlaying ? (
                    <PauseIcon
                        className="button w-10 h-10"
                        onClick={handlePlayPause}
                    />
                ) : (
                    <PlayIcon
                        className="button w-10 h-10"
                        onClick={handlePlayPause}
                    />
                )}

                <FastForwardIcon
                    className="button"
                    onClick={() => spotifyApi.skipToNext()}
                />

                <ReplyIcon className="button" />
            </div>

            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeDownButton
                    className="button"
                    onClick={() => volume > 0 && setVolume(volume - 10)}
                />
                <input
                    type="range"
                    min={0}
                    max={100}
                    className="w-14 md:w-20"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                />
                <VolumeUpIcon
                    className="button"
                    onClick={() => volume < 100 && setVolume(volume + 10)}
                />
            </div>
        </div>
    );
}

export default Player;
