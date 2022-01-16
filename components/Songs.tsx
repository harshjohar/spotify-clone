import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import Song from "./Song";

function Songs() {
    const playlist = useRecoilValue<any>(playlistState);
    return (
        <div className="text-white px-8 flex flex-col space-y-1 pb-28">
            {playlist?.tracks.items.map((track:any, i:number)=> (
                <Song track={track} key={track.track.id} order={i}/>
            ))}
        </div>
    )
}

export default Songs
