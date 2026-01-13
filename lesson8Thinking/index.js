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

    let urlPath = request.url;

    if (urlPath === '/') {
        urlPath = '/index.html';
    } else if (urlPath === '/video') {
        urlPath = '/video.html';
    } else if (urlPath === '/rules') {
        urlPath = '/rules.html';
    };
    // Формируем полный путь к файлу
    let filePath = path.join(__dirname, "client", urlPath);

    if (!fs.existsSync(filePath)) { // если файла нет открываем тело
        console.log(`Файл не найден: ${filePath}. Отдаю 404.`);
        urlPath = '/404.html'; // меняем urlPath клиента на /404.html
        filePath = path.join(__dirname, 'client', urlPath); // переформировываем путь
        response.statusCode = 404;
    };
    
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
