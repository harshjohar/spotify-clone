import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <Head>
                <title>Spotify Clone | Harshjohar</title>
                <link rel="apple-touch-icon" href="https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg" />
                <link rel="shortcut icon" href="https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg"/>
            </Head>
            <main className="flex">
                <Sidebar />
                <Center />
            </main>

            <div className="sticky bottom-0">
                <Player/>
                </div>
        </div>
    );
}

export async function getServerSideProps(context:any) {
    const session = await getSession(context);

    return {
        props: {
            session
        }
    }
}