const fs = require('fs');
const formidable = require('formidable');
const createServer = require('http').createServer;

const handler = (req, res) => {
    let dest = req.url;
    if(req.method.toLowerCase() == 'get') {
        switch(dest) {
            case '/getSongs':
                getSongs(req, res);
                break;
            case '/getWallpapers':
                getWallpapers(req, res);
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
    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify(dataMap));
}

const getWallpapers = (req, res) => {
    fs.readdir('./client/public/background/', (err, files) => {
        let file = files[Math.round(Math.random() * files.length)];
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(file));
    });
}

const addPlaylist = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        let name = fields.playlistName;
        let dataMap = require("./music_saves.json");
        dataMap["playlists"][name] = [];
        fs.writeFile("music_saves.json", JSON.stringify(dataMap, null, '  '), "utf8", callback=>{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(dataMap));
        });
    });
}

const addToPlaylist = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        let playlist = fields.playlist;
        let songs = fields.songs;
        let dataMap = require("./music_saves.json");
        dataMap["playlists"][playlist] = dataMap["playlists"][playlist].concat(songs);
        fs.writeFile("music_saves.json", JSON.stringify(dataMap, null, '  '), "utf8", callback=>{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(dataMap));
        });
    });
}

const removeFromPlaylist = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        let playlist = fields.activeIndex;
        let number = fields.number;
        let dataMap = require("./music_saves.json");
        dataMap["playlists"][playlist].splice(number, 1);
        fs.writeFile("music_saves.json", JSON.stringify(dataMap, null, '  '), "utf8", callback=>{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(dataMap));
        });
    });
}

const deletePlaylist = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        let playlist = fields.playlist;
        let dataMap = require("./music_saves.json");
        delete dataMap["playlists"][playlist];
        fs.writeFile("music_saves.json", JSON.stringify(dataMap, null, '  '), "utf8", callback=>{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(dataMap));
        });
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
        fs.writeFile("music_saves.json", JSON.stringify(dataMap, null, '  '), "utf8", callback=>{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(dataMap));
        });
    });
}

createServer(handler).listen(5000);

console.log("Listening at 5000...");