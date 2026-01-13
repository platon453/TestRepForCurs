const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');

const PORT = 3000;


const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".json": "application/json",
    ".mp4": "video/mp4",
};

const server = http.createServer((request, responce) => {
    console.log(`Пользователь отправил запрос: ${request.url}`);

    let url;
    if (request.url === '/') {
        url = '/index.html';
    } else if (request.url === '/rules') {
        url = '/rules.html';
    } else if (request.url === '/api') {
        obj = {
            "file": 20,
            "mp4": 25,
            "sssss": 100,
            "aud": 1111,
        }
        responce.setHeader("Content-type", "application/json");
        responce.write(JSON.stringify(obj));
        responce.end();
        return;

    } else {
        url = '/404.html';
    }

    const fulePath = path.join(__dirname, 'client', url);

    const extname = path.extname(fulePath);
    console.log(extname);

    const automaticContentType = MIME_TYPES[extname] || "text/plain";
    console.log(automaticContentType);

    const fileStream = fs.createReadStream(fulePath);

    responce.setHeader("Content-type", automaticContentType);

    fileStream.pipe(responce);

    fileStream.on('error', (err) => {
        responce.statusCode = 404;
        responce.end();
    })
});
server.listen(PORT);
console.log(`Server is already run on adress http://localhost:${PORT}`);
