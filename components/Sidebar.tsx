import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    UsersIcon,
} from "@heroicons/react/outline";

import {HeartIcon} from "@heroicons/react/solid"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
function Sidebar() {
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState<any>([]);
    const spotifyApi = useSpotify();
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()!) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);
    return (
        <div className="text-gray-500 p-5 text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] border-r border-gray-900 overflow-y-scroll h-[80vh] scrollbar-hide hidden md:inline-flex">
            <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5 text-blue-500"/>
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5 text-green-600" />
                    <p>Your Epsiodes</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900" />

                {playlists.map((playlist: any) => (
                    <p
                        key={playlist.id}
                        className="cursor-pointer hover:text-white flex items-center justify-between"
                        onClick={() => setPlaylistId(playlist.id)}
                    >
                        {playlist.name}
                        {playlist.collaborative && <span><UsersIcon className="h-3 w-4"/></span>}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
