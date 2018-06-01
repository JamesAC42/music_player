const play = require("audio-play");
const load = require("audio-loader");

load("./music/tmws.mp3").then(buffer => {
    play(buffer, {
        autoplay: true
    });
});



