import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {shuffle} from "lodash";

function Center() {
    const { data: session } = useSession();
    const colors = [
        "from-red-500",
        "from-indigo-500",
        "from-green-500",
        "from-yellow-500",
        "from-pink-500",
        "from-purple-500",
    ]
    const [color, setColor] = useState<string | null>(null);
    useEffect(() => {
        setColor(shuffle(colors).pop()!);
    }, [])
    return (
        <div className="flex-grow text-white ">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
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
                <img src="" alt="" />
            </section>
        </div>
    );
}

export default Center;
