const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path'); 

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

const server = http.createServer((request, response) => {
    console.log(`Клиент отправил Запрос: ${request.url}`);

    // let url;
    // if (request.url === '/') {
    //     url = "/index.html";
    // } else if (request.url === '/video') {
    //     url = "/video.html"
    // } else {
    //     url = `${request.url}.html`; // Временный костыль 
    // }

    let url;
    if (request.url === '/') {
        url = "/index.html"
    } else if (request.url === '/video') {
        url = "/video.html";
    } else if (request.url === '/rules') {
       url = "/rules.html";
    } else {
        url = request.url;
     }
    
    const filePath = path.join(__dirname, "client", url);
    
    // Надо определить расширения файла (.css, .html, .tsx)
    const extname = path.extname(filePath);

    console.log(extname)

    // Создаем автоматические опредление "Content-type" ("text/html"...)
    const automaticContentType = MIME_TYPES[extname] || 'text/plain';

    console.log(automaticContentType);

    // Создали поток чтения
    const fileStream = fs.createReadStream(filePath);

    response.setHeader("Content-type", automaticContentType);

    fileStream.pipe(response);

    fileStream.on('error', (err) => {
        response.statusCode = 404;
        response.end();
    });
});

server.listen(PORT);
console.log(`Server is already run on adress http://localhost:${PORT}`);
