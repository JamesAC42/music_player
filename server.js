const fs = require("fs");
const path = require("path");
const url = require("url");
const formidable = require("formidable");

const handler = (req, res) => {
    let dest = req.url;
    if(req.method.toLowerCase() == 'get') {
        switch(dest) {
            case '/getSongs':
                getSongs(req, res);
                break;
            case '/testing':
                res.write(JSON.stringify({message: "Hello"}));
                res.end();
                break;
            default:
                res.end();
        }
    } else if(req.method.toLowerCase() == 'post') {
        switch(dest) {
            case '/addPlaylist':
                addPlaylist(req, res);
                break;
            case '/removeFromPlaylist':
                removeFromPlaylist(req, res);
                break;
            case '/addToPlaylist':
                addToPlaylist(req, res);
                break;
            case '/deletePlaylist':
                deletePlaylist(req, res);
                break;
            case '/editPlaylistName':
                editPlaylistName(req, res);
                break;
            default:
                res.end();
        }
    } else {
        res.end();
    }
}

const server = require('http').createServer(handler);

const fileTypes = {
    '.html':'text/html',
    '.js':'text/javascript',
    '.css':'text/css',
    '.flac':'audio/flac',
    '.mp3':'audio/mpeg',
    '.jpg':'image/jpg',
    '.png':'image/png',
    '.ico':'image/x-icon',
    '.ttf':'application/octet-stream'
}

const getSongs = (req, res) => {
    let dataMap = require("./music_saves.json");
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.end(JSON.stringify(dataMap));
}

const addPlaylist = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        let name = fields.playlistName;
        let dataMap = require("./music_saves.json");
        dataMap["playlists"][name] = [];
        fs.writeFile("music_saves.json", JSON.stringify(dataMap, null, '  '), "utf8", callback=>{return});
        res.write(name);
        res.end();
    });
}

const addToPlaylist = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        let playlist = fields.playlist;
        let songs = JSON.parse(fields.songs);
        let dataMap = require("./music_saves.json");
        dataMap["playlists"][playlist] = dataMap["playlists"][playlist].concat(songs);
        fs.writeFile("music_saves.json", JSON.stringify(dataMap, null, '  '), "utf8", callback=>{return});
        res.write(playlist);
        res.end();
    });
}

const removeFromPlaylist = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        let playlist = fields.activeIndex;
        let number = fields.number;
        let dataMap = require("./music_saves.json");
        dataMap["playlists"][playlist].splice(number, 1);
        fs.writeFile("music_saves.json", JSON.stringify(dataMap, null, '  '), "utf8", callback=>{return});
        res.write(playlist);
        res.end();
    });
}

const deletePlaylist = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        let playlist = fields.playlist;
        let dataMap = require("./music_saves.json");
        delete dataMap["playlists"][playlist];
        fs.writeFile("music_saves.json", JSON.stringify(dataMap, null, '  '), "utf8", callback=>{return});
        res.write(playlist);
        res.end();
    });
}

const editPlaylistName = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        let oldName = fields.oldName;
        let newName = fields.newName;
        let dataMap = require("./music_saves.json");
        let temp = dataMap["playlists"][oldName];
        delete dataMap["playlists"][oldName];
        dataMap["playlists"][newName] = temp;
        fs.writeFile("music_saves.json", JSON.stringify(dataMap, null, '  '), "utf8", callback=>{return});
        res.write(newName);
        res.end();
    })
}

server.listen(5000);
console.log("Listening at 5000...");