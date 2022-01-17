import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import HomeLanding from "./HomeLanding";

function Center() {
    const { data: session } = useSession();
    const colors = [
        "from-red-500",
        "from-indigo-500",
        "from-green-500",
        "from-yellow-500",
        "from-pink-500",
        "from-purple-500",
    ];
    const [color, setColor] = useState<string | null>(null);
    const playlistId = useRecoilValue<any>(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState<any>(playlistState);
    const spotifyApi = useSpotify();

    useEffect(() => {
        setColor(shuffle(colors).pop()!);
    }, [playlistId]);

    useEffect(() => {
        spotifyApi
            .getPlaylist(playlistId)
            .then((data) => {
                setPlaylist(data.body);
            })
            .catch((err) => console.log("something went wrong!", err));
    }, [spotifyApi, playlistId]);
    return (
        <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div onClick={()=>signOut()} className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                    <img
                        src={session?.user?.image!}
                        alt=""
                        className="rounded-full h-10 w-10"
                    />
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>

            <section
                className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 `}
            >
                <img
                    src={playlist?(playlist?.images?.[0]?.url):"https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg"}
                    alt=""
                    className="h-[5rem] w-[5rem] md:h-44 md:w-44 shadow-2xl"
                />
                <div>
                    <p>{playlist&&(playlist?.collaborative?"COLLABORATIVE PLAYLIST":"PLAYLIST")}</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                        {playlist?playlist?.name:"Welcome to spotify"}
                    </h1>
                </div>
            </section>

            <div>
                {playlist?<Songs/>:<HomeLanding/>}
            </div>
        </div>
    );
}

export default Center;
