function HomeLanding() {
    return (
        <div className="p-5 border-white border rounded-xl space-y-2 overflow-y-scroll scrollbar-hide">
            <p className="text-base">This is a spotify remote control</p>
            <p className="text-sm">
                Open spotify instance on any of your device with the account you
                logged in here
            </p>
            <p className="text-sm">
                Now u can play the songs on that device using this website as remote control.
            </p>
            <p className="text-sm">
                Just select the playlist you want to play and click on the song.
            </p>
            <small className="text-xs">Yeah sounds weird, but this is the way spotify api is built, cant do much about that</small>
        </div>
    );
}

export default HomeLanding;
