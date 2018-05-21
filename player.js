const play = require("audio-play");
const load = require("audio-loader");

load("./music/Birdland---Maynard-Ferguson.mp3").then(buffer => {
    play(buffer, {
        autoplay: true
    });
});



